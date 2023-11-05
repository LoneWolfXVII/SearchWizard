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
from data_analysis.vectordb import VectorStore
from dotenv import find_dotenv, load_dotenv
from data_analysis.data_visualisation import DataVisualiser
from pathlib import Path
import csv
import re
import io
import base64
import json
from PIL import Image







env_path=Path('.')/'.env'
load_dotenv(dotenv_path=env_path)


class CSVDataAnalyser:
    def __init__(self) -> None:
        pass

    def connect_to_database(self,datasource_name):
        """Establishes a connection to the database."""
        return sqlite3.connect(f'data/{datasource_name}')
    
    def main(self,user_query,datasource_name):
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
            schema_description =""
        # Setup
            openai.set_api_key(os.getenv('OPENAI_API_KEY'))
            model = openai.start_chat('gpt-4-0613')
            db_connection = self.connect_to_database(datasource_name)
            schema_description += get_db_creation_sql(db_connection)
            print(schema_description)
            db_connection.close()
            system_message = (
            "You are an assistant for a database..."
            # ... (rest of the system message)
        )
            system_message += schema_description
            response = check_question(
            user_query,
            schema_description,
            model,
            function_descriptions
            )
            print(response)





        
            
        



