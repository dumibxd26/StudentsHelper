from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO, emit, send, join_room, leave_room

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('connect')
def on_connect():
    print('A client connected')

@socketio.on('disconnect')
def on_disconnect():
    print('A client disconnected')

@socketio.on('join')
def on_join(data):
    name = data['name']
    room = data['room']
    join_room(room)
    
    if name != room :
        send(data['message'], room=room)

@socketio.on('leave')
def on_leave(data):
    name = data['name']
    room = data['room']
    leave_room(room)
    send(name + ' has left.', room=room)

@socketio.on('message')
def on_message(data):
    name = data['name']
    message = data['message']
    room = data['room']
    send(data, room=room)


if __name__ == '__main__':
    socketio.run(app, debug=True)
