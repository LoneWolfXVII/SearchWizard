"""
A collection of tools that LLMs can use to solve problems.

A tool is a function with a standard description.
"""
from collections.abc import Callable
import sqlite3
import mysql.connector


def make_sqlite_query_tool(db_connection: sqlite3.Connection) -> Callable:
    """Run a sqlite query against a given database connection."""


    description = 'Run a sqlite query against a databse.'
    params = {
        'query': {
            'description': 'The query to run',
            'typ': str,
            'required': True
        }
    }


    def sqlite_tool(query: str) -> str:
        cursor = db_connection.cursor()
        try:
            results = str(cursor.execute(query).fetchall())
        except Exception as error:
            results = f'Query failed: {error}'
        return results

    return sqlite_tool, (description, params)




def make_mysql_query_tool(db_connection: mysql.connector.MySQLConnection) -> Callable:
    """Run a MySQL query against a given database connection."""

    description = 'Run a MySQL query against a database.'
    params = {
        'query': {
            'description': 'The query to run',
            'type': str,
            'required': True
        }
    }

    def mysql_tool(query: str) -> str:
        cursor = db_connection.cursor()
        try:
            cursor.execute(query)
            results = str(cursor.fetchall())
        except mysql.connector.Error as error:
            results = f'Query failed: {error}'
        return results

    return mysql_tool, (description, params)
