import React, { useEffect, useState} from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5001');

function Chat() {

  const [messages, setMessages] = useState([]);

  let steps = 0;

  const initialiseConnection = () => {

    socket.emit('join', {
      name: localStorage.getItem('name'),
      room: localStorage.getItem('currentChat')
    });

    // Listen for events emitted by the server
    socket.on('message', (data) => {
      console.log(data);

      setMessages(prevState => {
        steps++;

        if (data['room'] != localStorage.getItem('currentChat')) return [];
        if (steps % 2 || data['name'] == localStorage.getItem('name')) return prevState;
        return [...prevState, {message: data['message'], sender: data['name']}];
      });
    });

  }

  useEffect(() => {
    initialiseConnection();
  }, []);
  
  const handleClick = (e) => {
      e.preventDefault();

      const user = localStorage.getItem('name');

      socket.emit('message', {message: document.getElementById("messageId").value, room: localStorage.getItem('currentChat'), name: user});
      
      setMessages(prevState => {
        return [...prevState, {message: document.getElementById("messageId").value, sender: 'you'}];
      });

      document.getElementById("messageId").value = "";
    }


  return (
    <div>
        <ul>
            {messages.map((message, index) => {
                return <li key={index}>{message.message + ', ' + message.sender}</li>
            })
            }     
        </ul>
        <form>
            {/* create a form for the socketio server */}

            <input type="text" id="messageId" />

            <button onClick={handleClick}>Send</button>

        </form>

    </div>
  );
}

export default Chat;
