from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('connect')
def on_connect():
    print('A client connected')

@socketio.on('disconnect')
def on_disconnect():
    print('A client disconnected')

@socketio.on('message')
def on_message(data):
    print(f'Received message: {data}')
    emit('message', data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, debug=True)
