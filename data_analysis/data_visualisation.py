import mysql.connector
from langchain.llms import OpenAI
from langchain.chains import ConversationChain,LLMChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts.prompt import PromptTemplate
import os 
import json
from langchain.document_loaders import JSONLoader   
from langchain.memory import ChatMessageHistory
from langchain.prompts import ChatPromptTemplate
from langchain.chat_models import ChatOpenAI
from typing import List,Dict,Any
from langchain.schema import (
    BaseChatMessageHistory,
    BaseMessage,
    messages_from_dict,
    messages_to_dict,
)
import shutil
import requests
import base64
import uuid
from langchain.llms import OpenAI
from langchain.chains import ConversationChain,LLMChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts.prompt import PromptTemplate
from langchain.agents import AgentType
import os 
import json
from langchain.document_loaders import JSONLoader   
from langchain.memory import ChatMessageHistory
from langchain.prompts import ChatPromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.output_parsers import StructuredOutputParser, ResponseSchema
from typing import List,Dict,Any
from langchain.schema import (
    BaseChatMessageHistory,
    BaseMessage,
    
    messages_from_dict,
    messages_to_dict,
)

import re
import shutil
import requests
import base64
import uuid
import openai
import pprint
from langchain.utilities import GoogleSerperAPIWrapper
import subprocess
from datetime import datetime
from pathlib import Path
import time
from langchain.agents import load_tools, initialize_agent
from langchain.agents import AgentType
import calendar
from datetime import date
from dotenv import find_dotenv, load_dotenv
import matplotlib.pyplot as plt
import uuid
import io
import base64





class DataVisualiser:
    def __init__(self):
        pass

    def get_completion(self,messages,model="gpt-3.5-turbo-16k",temperature=0):
        response=openai.ChatCompletion.create(
        model=model,
        messages=messages,
        temperature=temperature, 
    )
        return response.choices[0].message["content"]
    

    def sql_extractor(self, response):

        print("Extracting SQL....")
        """
        This function extracts SQL queries from the response based on delimiters.
        """
        # Using regex to extract SQL statements enclosed between ```sql and ```.
        sql_statements = re.findall(r'```sql(.*?)```', response, re.DOTALL)
        
        # Extracting the first SQL query, removing leading and trailing spaces, 
        # and replacing newline characters with spaces.
        if sql_statements:
            return sql_statements[0].strip().replace("\n", " ")
        
        return None
    

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


    

    def generate_sql_for_datavisualisation(self, query,react_log,database_schema):
        
        # This function will generate a plan based on the user query and the database schema
        delimiter = "####"
        delimiter2 = "****"
        delimiter4= "$$$$"
        system_message = f"""
You are provided with a user query, a database schema, and an LLM agent's thought process (react log) to retrieve an answer from the database.

The react log contains a series of messages that detail the LLM's thought process and the SQL queries it intends to execute. Your task is to analyze these messages and modify or generate a new SQL query based on the following criteria:

1. The final SQL query should not return a single data point. Instead, it should return multiple data points suitable for visualization on a graph.
2. If the LLM's thought process provides an SQL query that returns a single data point, you must modify it to return multiple data points. For instance, if the LLM intends to retrieve the most booked hotel, you should modify the query to retrieve the booking counts for all hotels, so the data can be plotted on a graph.
3. Ensure that the generated SQL query aligns with the user's original query and the LLM's thought process.

User Query: {delimiter2}{query}{delimiter2}
LLM React Log: {delimiter4}{react_log}{delimiter4}
Database Schema: {delimiter}{database_schema}{delimiter}

Provide your response in json format with \
keys : SQL_QUERY, Data_Description 
Data_Description : One Line Description of data that will be fetched using this SQL Query.
"""



        messages = [
            {'role': 'system',
            'content': system_message},
            {'role': 'user',
            'content': f"{delimiter}{database_schema}{delimiter}"},
        ]
        response = self.get_completion(messages)
        response_schemas = [
            ResponseSchema(name="SQL_QUERY", description="SQL Query for data visualisation"),
            ResponseSchema(name="Data_Description", description="One Line Description of data that will be fetched using this SQL Query"),
        ]
        output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
        response=output_parser.parse(response)
        
        
        return response
    

    def get_plot_function_params(self,data,data_description):
        
        # This function will generate a plan based on the user query and the database schema
        delimiter = "####"
        delimiter2 = "****"
        delimiter4= "$$$$"
        system_message = f"""
You are provided with raw data and it's description.

Your task is to analyze raw data and it's description and provide input parameters for a generate plot function.\
Generate Plot Function Parameters : 
- data: The data to be plotted. This should be a dictionary where keys are x-axis values and values are y-axis values.
- plot_title: The title of the plot.
- axis_names: A tuple containing names for the x and y axes respectively.
- graph_type: The type of graph to be plotted (e.g., 'bar', 'pie', 'line', 'scatter', 'histogram', etc.)

Based on raw data and it's description,you have to decide what should be best graph_type to represent this data and provide parameters for generate plot function.
Provide your response in json format with \
keys : data,plot_title,axis_names,graph_type

data description: {delimiter2}{data_description}{delimiter2}
"""



        messages = [
            {'role': 'system',
            'content': system_message},
            {'role': 'user',
            'content': f"{delimiter}{data}{delimiter}"},
        ]
        response = self.get_completion(messages)
        response_schemas = [
            ResponseSchema(name="data", description="Data for generate plot function"),
            ResponseSchema(name="plot_title", description="plot_title for generated graph"),
            ResponseSchema(name="axis_names", description="axis_names for generated graph"),
            ResponseSchema(name="graph_type", description="graph_type for generated graph"),
        ]
        output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
        response=output_parser.parse(response)
        
        
        return response
    


    def get_insight_function_params(self, data, data_description, user_query):
        
        # Using delimiters to separate and extract information.
        delimiter = "####"
        delimiter2 = "****"
        delimiter4 = "$$$$"
        
        # Defining the system message for this function.
        system_message = f"""
You are provided with raw data, its description, and a user query.

Your task is not merely to describe the data but to critically analyze it in the context of the user query and its description. Extract actionable insights that can directly inform and drive business decisions.

- User Query: {delimiter2}{user_query}{delimiter2}
- Data Description: {delimiter4}{data_description}{delimiter4}

Based on the information provided:

1. Deliver a minimum of 3 to 5 actionable insights. These should be deep and strategic recommendations that can positively impact business outcomes.
2. Every insight should be grounded in the data, relevant to the user query, and offer clear avenues for business growth or improvements.
3. Be concise, yet ensure each insight carries weight and significance.

Format your response as:
- Insight 1: ...
- Insight 2: ...
- ...

Provide your response in JSON format with keys: 'insight_title' and 'insight_description'
"""


        
        messages = [
            {'role': 'system', 'content': system_message},
            {'role': 'user', 'content': f"{delimiter}{data}{delimiter}"},
        ]
        response = self.get_completion(messages)

        
        return response

    


    
    def generate_plot(self, data, plot_title, axis_names, graph_type):
        """
        Generate a plot based on the provided data and return it as a base64 encoded PNG image.

        Parameters:
        - data: The data to be plotted. This should be a dictionary where keys are x-axis values and values are y-axis values.
        - plot_title: The title of the plot.
        - axis_names: A tuple containing names for the x and y axes respectively.
        - graph_type: The type of graph to be plotted (e.g., 'bar', 'pie', 'line', 'scatter', 'histogram', etc.)

        Returns:
        - Base64 encoded PNG image string.
        """
        num_data_points = len(data)
        fig_width = max(10, num_data_points * 0.5)  # Adjust width based on number of data points
        fig, ax = plt.subplots(figsize=(fig_width, 7))
        
        ax.set_title(plot_title)
        ax.set_xlabel(axis_names[0])
        ax.set_ylabel(axis_names[1])
        ax.set_facecolor('white')

        if graph_type == 'bar':
            ax.bar(data.keys(), data.values(), color='blue')
            plt.xticks(rotation=70)  # Increase rotation angle
            plt.tight_layout()
        elif graph_type == 'pie':
            ax.pie(data.values(), labels=data.keys(), autopct='%1.1f%%', startangle=90)
        elif graph_type == 'line':
            ax.plot(list(data.keys()), list(data.values()), marker='o', color='blue')
            plt.xticks(rotation=70)
            plt.tight_layout()
        elif graph_type == 'scatter':
            ax.scatter(data.keys(), data.values(), color='blue')
        elif graph_type == 'histogram':
            ax.hist(list(data.values()), bins=10, color='blue', alpha=0.7)
        elif graph_type == 'area':
            ax.fill_between(data.keys(), data.values(), color='blue', alpha=0.4)
        elif graph_type == 'box':
            ax.boxplot(list(data.values()))
        # Add more graph types as needed

        fig.autofmt_xdate()  # Automatically adjust x-axis labels to prevent overlap

        # Convert plot to base64 instead of saving to file
        image = io.BytesIO()
        plt.savefig(image, format="png", bbox_inches='tight')
        plt.close()

        base64_image = base64.b64encode(image.getvalue()).decode('utf-8')
        return base64_image

    

    


