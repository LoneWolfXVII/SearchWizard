from collections.abc import Callable

from data_analysis.src.irame_da.llmtools import openaiapi as openai

def check_question(question: str, context: str, model: Callable, functions_descriptions: list[dict]) -> str:
    print("Checking Question Reasonability....")
    system_message = (
        "You are a helpful AI assistant.  Your job is to check the reasonableness "
        "of user questions.  If the user question can be answered given the tools "
        "available say, \"This is a reasonable question.\"  If the user question "
        "cannot be answered then provide some feedback to the user that may improve "
        "their question.\n\n"
        f"Here is the context for the question:\n{context}"
    )
    user_question = f'Question: {question}'
    messages = [
        openai.Message('system', system_message),
        openai.Message('user', user_question)
    ]

    response = model(messages, functions=functions_descriptions)

    return response.content




def question_generator(question: str, context: str, model: Callable,functions_descriptions: list[dict]) -> str:
    print("Generating Questions ....")
    """
    Generates reasonable and relevant questions based on the user's query and context. 
    The generated questions aim to provide deeper insights for business growth.
    Additionally, the function provides SQL queries to fetch data for the generated questions.

    Parameters:
    - question (str): The user's query.
    - context (str): The broader context or theme of the user's query.
    - model (Callable): The AI model to generate the questions.
    - functions_descriptions (list[dict]): Descriptions of available functions.

    Returns:
    - str: The model's response containing the generated questions and SQL queries.
    """

    # system_message = (
    #     "You are a helpful AI assistant. Your job is to understand the broader theme or context "
    #     "of the user's query and generate two reasonable and relevant questions in plain english."
    #     "Ensure that the generated questions can be answered given the tools."
    #     "These questions should help user derive deeper insights based on original question's theme for better decision making."
    #     f"Here is the context for the question:\n{context}"
    # )
    system_message = (
        "Analyze the provided user query and database schema.Understand the broader theme or context of the user query.Based on this understanding,provide highly related questions to derive insights from the database that will help in better decision making for Business Growth"
        f"Database Schema : \n{context}"
    )
    
    user_question = f'Question: {question}'
    
    messages = [
        openai.Message('system', system_message),
        openai.Message('user', user_question)
    ]

    response = model(messages, functions=functions_descriptions)

    return response.content



def question_generator2(question: str, context: str, model: Callable, functions_descriptions: list[dict]) -> str:
    print("Modifying Query for Graph Visualization ...")
    """
    Modifies the user's query based on the database schema to be suitable for graph visualization. 
    Additionally, the function provides SQL queries to fetch data corresponding to the modified query.

    Parameters:
    - question (str): The user's original query.
    - context (str): The database schema or theme of the user's query.
    - model (Callable): The AI model to modify the query and generate SQL.
    - functions_descriptions (list[dict]): Descriptions of available functions.

    Returns:
    - str: The model's response containing the modified query and SQL queries.
    """

    system_message = (
        "Based on the provided user query and database schema, modify the query so that it can be visualized on a graph. "
        "Ensure that the modified query captures all relevant data from the database. "
        "Additionally, provide an SQL query that fetches the necessary data from the database according to the modified user query for graph visualization. "
        f"Database Schema : \n{context}"
    )
    
    user_question = f'Original Query: {question}'
    
    messages = [
        openai.Message('system', system_message),
        openai.Message('user', user_question)
    ]

    response = model(messages, functions=functions_descriptions)

    return response.content




def critique_transcript(transcript: str, model: Callable, functions_descriptions: list[dict]) -> str:
    system_message = (
        "You are a helpful AI assistant.  Your job is to check the accuracy of a "
        "user-AI interaction.  If the interaction looks accurate say, \"This "
        "appears accurate.\"  If the interaction appears to have flaws then "
        "respond with suggestions on how to correct the mistakes."
    )
    user_question = f"Here is the transcript of the interaction:\n{transcript}"
    messages = [
        openai.Message('system', system_message),
        openai.Message('user', user_question)
    ]

    response = model(messages, functions=functions_descriptions)

    return response.content
