from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
from data_analysis.data_analyser2 import SQLDataAnalyser
import time
import json
import uuid 
import threading

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

last_processed_query = None
last_processed_time = 0


def process_sql_query(query,data_source_name):
    da.process_query(query,data_source_name)
    
    

@app.route('/')
def index():
    return render_template('index.html')
@app.route('/get_answer', methods=['POST'])
def get_answer():
    try:
        print("Received request for /get_answer")  # Added logging
        if not request.json:
            raise ValueError("No JSON payload received")

        query = request.json.get('query')
        if query is None:
            raise ValueError("No 'query' found in the payload")

        data_source_name = request.json.get('Data Source Name')
        if data_source_name is None:
            raise ValueError("No 'Data Source Name' found in the payload")

        task_id = str(uuid.uuid4())
        thread = threading.Thread(target=process_sql_query, args=(query, data_source_name))
        thread.start()
        return jsonify({"message": "Process initiated", "task_id": task_id}), 202

    except ValueError as e:
        return jsonify({"error": str(e)}), 400  # Bad Request for client-side errors
    except Exception as e:
        # Log the exception details for debugging purposes
        print(f"An error occurred: {e}")
        return jsonify({"error": "An internal error occurred"}), 500  # Inte
   


@app.route('/get_left_nav_items')
def get_left_nav_items():
    # Load the data from dashboards.json
    with open("dashboards.json", "r") as file:
        data = json.load(file)

    items = []
    for name, details in data.items():
        # Extract details for each item
        class_name = details.get("class")
        dropdown_options = list(details.get("dashboards", {}).keys())

        item = {
            "class": class_name,
            "datasource_name": name,
            "dropdown": dropdown_options
        }
        items.append(item)
        print(items)

    response = jsonify(items)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response




@app.route('/page/<string:option_name>')
def serve_option_page(option_name):
    return render_template('dashboards.html', option_name=option_name)


@app.route('/update_dashboard', methods=['POST'])
def update_dashboard():
    # Load the current data from dashboards.json
    with open("dashboards.json", "r") as file:
        data = json.load(file)

    # Extract the provided parameters from the request
    data_source_name = request.json.get('Data Source Name')
    class_name = request.json.get('class')
    dashboard_name = request.json.get('dashboard name')
    graph_description = request.json.get('graph_description')
    sql_query = request.json.get('sql_query')
    plot_params = request.json.get('plot_params')

    # Check if the data source name exists
    if data_source_name not in data:
        data[data_source_name] = {
            "class": class_name,
            "dashboards": {}
        }

    # Check if the dashboard name exists within the data source
    if dashboard_name not in data[data_source_name]['dashboards']:
        data[data_source_name]['dashboards'][dashboard_name] = {}

    # Update or add the graph description
    data[data_source_name]['dashboards'][dashboard_name][graph_description] = {
        "sql_query": sql_query,
        "plot_params": plot_params
    }

    # Save the updated data back to dashboards.json
    with open("dashboards.json", "w") as file:
        json.dump(data, file, indent=4)

    return jsonify({"status": "success"})

@app.route('/get_dashboard_graphs', methods=['POST'])
def get_dashboard_graphs():
    data_source_name = request.json.get('data_source_name')
    dashboard_name = request.json.get('dashboard_name')
    response = da.generate_dashboard_graphs(data_source_name,dashboard_name)

    if response["status"] == "error":
        return jsonify({"status": "error", "message": response["message"]}), 400  # Bad Request
    return jsonify({"status": "success", "graphs": response["graphs"]})


if __name__ == '__main__':
    da = SQLDataAnalyser(db_type="mysql", socketio=socketio)
    socketio.run(app,host='0.0.0.0',port=8080,debug=True)
