import os
import logging
import sqlite3
import mysql.connector
import sys
from datetime import datetime

from data_analysis.src.irame_da.llmtools import openaiapi as openai, tools
from data_analysis.src.irame_da.agents.react import make_react_agent
from data_analysis.src.irame_da.agents.helpers import check_question,question_generator,question_generator2
from data_analysis.src.irame_da.db.sqlite_utils import get_db_creation_sql
from data_analysis.src.irame_da.db.mysql_utils import get_db_creation_mysql
from dotenv import find_dotenv, load_dotenv
from data_analysis.data_visualisation import DataVisualiser
from pathlib import Path
import csv
import re



env_path=Path('.')/'.env'
load_dotenv(dotenv_path=env_path)


class DataAnalyser:
    def __init__(self, db_type="sqlite",socketio=None):
        self.db_type = db_type
        self.socketio = socketio
        self.DV=DataVisualiser()

        # Set the OpenAI API key from environment variable
        openai.api_key = os.getenv('OPENAI_API_KEY')
        
        # Logging setup
        logging.basicConfig(
            stream=sys.stdout,
            format='%(asctime)s %(message)s',
            datefmt='%m/%d/%Y %H:%M:%S'
        )
        logging.getLogger('agent').setLevel(logging.DEBUG)
        self.log = logging.getLogger('agent')
        
        self.MAX_LLM_CALLS_PER_INTERACTION = 10


    def log_to_file(self, filename, user_query, messages):
        """Logs the user query and messages to a text file."""
        with open(filename, 'a') as file:
            file.write(f"User Query: {user_query}\n")
            for idx, message in enumerate(messages, 1):
                file.write(f"Message {idx}: {message}\n")
            file.write("\n")  # Separate different user queries with a newline


    def show_answer(self, answer):
        if self.socketio:
            self.socketio.emit('show_answer', {'answer': answer})

    def show_suggestions(self, suggestions):
        if self.socketio:
            self.socketio.emit('show_suggestions', {'suggestions': suggestions})

    
    def connect_to_database(self):
        """Establishes a connection to the database."""
        if self.db_type == "sqlite":
            return sqlite3.connect('data/synthbank.db')
        elif self.db_type == "mysql":
            try:
                connection = mysql.connector.connect(
                    host="localhost",
                    user="sqluser",
                    passwd="password",
                    database="travelDB",
                    autocommit=True  # Automatically commit changes
                )
                return connection
            except mysql.connector.Error as err:
                print(f"Database connection failed: {err}")
                sys.exit(1) 


    def execute_sql_query(self, sql_query):
        """Executes the provided SQL query and returns the result."""
        db_connection = self.connect_to_database()
        cursor = db_connection.cursor()
        
        try:
            cursor.execute(sql_query)
            result = cursor.fetchall()
            return result
        except Exception as e:
            print(f"Error executing SQL query: {e}")
            return None
        finally:
            cursor.close()
            db_connection.close()



    def generate_suggestions(self,user_query,schema_description,model,function_descriptions):
        questions = question_generator(
            user_query,
            schema_description,
            model,
            function_descriptions
        )
        questions_list = questions.split('\n')
    
       # Record each generated question to a CSV
        valid_questions = []
        for question in questions_list:
            response = check_question(
                question,
                schema_description,
                model,
                function_descriptions
            )
            if "This is a reasonable question" in response:
                valid_questions.append(question)
                # Send the valid question to frontend
                self.show_suggestions(question)
                print(valid_questions)
                # Record the valid question to CSV
                self.record_to_csv('generated_questions.csv', [question])

        
        return valid_questions
    
    def generate_answer(self,user_query,system_message,function_descriptions,model):

        # Build the functions that the agent can use
        db_connection = self.connect_to_database()
        
        if self.db_type == "sqlite":
            query_database, _ = tools.make_sqlite_query_tool(db_connection)
        elif self.db_type == "mysql":
            query_database, _ = tools.make_mysql_query_tool(db_connection)
        else:
            raise ValueError("Unsupported database type")

        functions = {
            'query_database': query_database

        }
        
        agent = make_react_agent(
            system_message,
            model,
            function_descriptions,
            functions,
            self.MAX_LLM_CALLS_PER_INTERACTION,
            simple_formatting=False
        )
        
        chat_history = []
        for message in agent(user_query):
            chat_history.append(str(message))
            if message.role == 'assistant' and 'Final Answer:' in message.content:
                response = message.content.split('Final Answer:')[1].strip()
                db_connection.close()
                self.record_to_csv('questions_and_responses.csv', [user_query, response])
                self.log_to_file('chat_log.txt', user_query, chat_history)
                return response,chat_history
        
        db_connection.close()
        return "Could not determine an answer.",_

    def record_to_csv(self, filename, data):
        """Writes data to a CSV file."""
        with open(filename, 'a', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(data)


    
    




    def process_query(self, user_query, schema_description):
        function_descriptions = [
            {
                'name': 'query_database',
                'description': 'Query the database.',
                'parameters': {
                    'type': 'object',
                    'properties': {
                        'query': {
                            'type': 'string',
                            'description': 'A query to run against the database.'
                        },
                    },
                    'required': ['query']
                }
            }
        ]

        # Setup
        openai.set_api_key(os.getenv('OPENAI_API_KEY'))
        model = openai.start_chat('gpt-4-0613')
        db_connection = self.connect_to_database()
        if not db_connection:
            return "Failed to connect to the database."
        
        if self.db_type == "sqlite":
            schema_description += get_db_creation_sql(db_connection)
        elif self.db_type == "mysql":
            schema_description += get_db_creation_mysql(db_connection)
        db_connection.close()

        system_message = (
            "You are an assistant for a database..."
            # ... (rest of the system message)
        )

        system_message += schema_description
        
        # Check the reasonableness of the user's question
        # response = check_question(
        #     user_query,
        #     schema_description,
        #     model,
        #     function_descriptions
        # )
        # suggestions=[]
        # if "This is a reasonable question" not in response:
        #     self.show_answer(response)
        

        answer,react_log=self.generate_answer(user_query,system_message,function_descriptions,model)
        self.show_answer(answer)
        response=self.DV.generate_sql_for_datavisualisation(user_query,react_log,schema_description)
        sql_query=response.get('SQL_QUERY')
        data_description=response.get('Data_Description')
        data= self.execute_sql_query(sql_query)
        if data:
            plot_params=self.DV.get_plot_function_params(data,data_description)
            print(plot_params)
            self.DV.generate_plot(plot_params.get('data'),plot_params.get('plot_title'),plot_params.get('axis_names'),plot_params.get('graph_type'))
        else:
            print("Failed to execute SQL query.")
        
       
        suggestions=self.generate_suggestions(user_query,schema_description,model,function_descriptions)
        
        
        

        

# Example usage:
# chatbot = GenericDatabaseChatbot(db_type="mysql")
# schema_description = (
#     "Each user can book one or more flights and hotels. Flights have different classes, and hotels offer various room types..."
#     # ... (rest of the schema description)
# )

# while True:
#     query = input("Query : ")
#     da = DataAnalyser(db_type="mysql")
#     schema_description = (
#     "Each user can book one or more flights and hotels. Flights have different classes, and hotels offer various room types...") 
#     response = da.main(query,schema_description)  
#     print(response)