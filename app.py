from flask import Flask, render_template, request, jsonify
from flask_socketio import SocketIO, emit
from data_analysis.data_analyser2 import DataAnalyser
import time

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

last_processed_query = None
last_processed_time = 0

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_answer', methods=['POST'])
def get_answer():
    global last_processed_query, last_processed_time

    print("Received request for /get_answer")  # Added logging
    query = request.json.get('query')

    current_time = time.time()
    if query == last_processed_query and (current_time - last_processed_time) < 2:  # 2 seconds threshold
        print("Duplicate request detected. Ignoring.")
        return jsonify({"status": "ignored"})

    last_processed_query = query
    last_processed_time = current_time

    da.process_query(query, schema_description)
    print("Processed query in /get_answer")  # Added logging
    return jsonify({"status": "success"})

@app.route('/get_left_nav_items')
def get_left_nav_items():
    items = [
        {"class": "icon-db1", "name": "Travel -1", "dropdown": ["Option 1", "Option 2", "Option 3"]},
        {"class": "icon-db2", "name": "Travel -2", "dropdown": ["Option A", "Option B", "Option C"]},
        {"class": "db3", "name": "Finance - 1", "dropdown": ["Option X", "Option Y", "Option Z"]},
        {"class": "db4", "name": "Finance - 2", "dropdown": ["Option M", "Option N", "Option O"]},
    ]
    return jsonify(items)

@app.route('/page/<string:option_name>')
def serve_option_page(option_name):
    return render_template('option_page.html', option_name=option_name)


if __name__ == '__main__':
    da = DataAnalyser(db_type="mysql", socketio=socketio)
    schema_description = (
    "Each user can book one or more flights and hotels. Flights have different classes, and hotels offer various room types..."
    )
    socketio.run(app, debug=True)
