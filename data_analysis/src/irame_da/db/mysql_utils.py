import mysql.connector

def get_table_schema(conn: mysql.connector.MySQLConnection, table_name: str) -> str:
    """Get a description of a table."""
    cursor = conn.cursor()
    query = f"DESCRIBE {table_name};"
    cursor.execute(query)
    results = cursor.fetchall()
    schema_description = '\n'.join([str(row) for row in results])
    return schema_description

def get_db_creation_mysql(conn: mysql.connector.MySQLConnection) -> str:
    """Construct a description of the DB schema for the LLM by retrieving the
    CREATE commands used to create the tables."""
    cursor = conn.cursor()

    query = "SHOW TABLES"
    cursor.execute(query)
    tables = cursor.fetchall()

    schema_descriptions = []
    for table in tables:
        table_name = table[0]
        query = f"SHOW CREATE TABLE {table_name}"
        cursor.execute(query)
        create_table_command = cursor.fetchone()[1]
        schema_descriptions.append(create_table_command)

    return '\n'.join(schema_descriptions)

def create_database_from_csv(conn: mysql.connector.MySQLConnection, csv_file: str, table_name: str) -> None:
    """Create database table from a CSV file in MySQL."""

    # Connect to the MySQL database
    cursor = conn.cursor()

    # Read the CSV file and insert data into the database
    with open(csv_file, mode='r') as file:
        reader = csv.reader(file)
        header = next(reader)

        # Create the table in the database based on the CSV header
        columns = ", ".join(header)
        drop_table_query = f'DROP TABLE IF EXISTS {table_name}'
        cursor.execute(drop_table_query)

        create_table_query = f'CREATE TABLE {table_name} ({columns})'
        cursor.execute(create_table_query)

        # Insert rows into the table
        insert_query = f"INSERT INTO {table_name} VALUES ({', '.join(['%s'] * len(header))})"
        for row in reader:
            cursor.execute(insert_query, row)

    # Commit the changes
    conn.commit()

    print("Database created and data inserted successfully.")
