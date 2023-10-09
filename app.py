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

if __name__ == '__main__':
    da = DataAnalyser(db_type="mysql", socketio=socketio)
    schema_description = (
    "Each user can book one or more flights and hotels. Flights have different classes, and hotels offer various room types..."
    )
    socketio.run(app, debug=True)
