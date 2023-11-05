import os
import logging
import sqlite3
import mysql.connector
import sys
from datetime import datetime

from data_analysis.src.irame_da.llmtools import openaiapi as openai, tools
from data_analysis.src.irame_da.agents.react import make_react_agent
from data_analysis.src.irame_da.agents.helpers import check_question,question_generator,question_generator2
from data_analysis.src.irame_da.db.sqlite_utils import get_db_creation_sql,create_database_from_csv, get_conn 
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






def create_db_and_table_from_csv(db_name: str, csv_file: str, table_name: str) -> None:
    """Create SQLite DB and table from CSV."""

    # 1. Create SQLite DB file and establish connection
    conn = get_conn(db_name)

    # 2. Call the function to create a table from CSV
    create_database_from_csv(conn, csv_file, table_name)

    # Close the connection
    conn.close()



