import React, { useEffect, useState} from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5001');

function Chat() {

  const [messages, setMessages] = useState([]);

  let steps = 0;

  useEffect(() => {

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    // Listen for events emitted by the server
    socket.on('message', (data) => {
      console.log(`Received message: ${data}`);

      setMessages(prevState => {
        steps++;

        if (steps % 2) return prevState;
        return [...prevState, data]
      });
    });

  }, []);
  
    const handleClick = (e) => {
        e.preventDefault();
       socket.send(document.getElementById("messageId").value);

        document.getElementById("messageId").value = "";
    }


  return (
    <div>
        <ul>
            {messages.map((message, index) => {
                return <li key={index}>{message}</li>
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
