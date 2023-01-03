from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit, send

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

@socketio.on('connect')
def on_connect():
    print('A client connected')

@socketio.on('disconnect')
def on_disconnect():
    print('A client disconnected')

@socketio.on('message')
def on_message(data):
    print(f'Received message: {data}')
    send('message', data, broadcast=True)

if __name__ == '__main__':
    socketio.run(app)
