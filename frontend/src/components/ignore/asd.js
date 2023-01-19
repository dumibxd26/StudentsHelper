import React, { useEffect, useState} from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5001');

function Chat() {

  const [messages, setMessages] = useState([]);

  let steps = 0;

  const initialiseConnection = () => {

    // let roomName = localStorage.getItem('currentChat');

    const JWT = localStorage.getItem("token");

    if (!JWT) {
      return ;
    }

    fetch("http://localhost:5000/checkTokenForFrontend/" + JWT, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
    .then((res) => res.json())
    .then(data => {
        const userType = data.userType;
        const id = data.id;

        if (userType === "helper") {
            fetch("http://localhost:5000/checkConnection", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({id: id})
            })
            .then((res) => res.json())
            .then(data => {
                const roomName = data.room
                localStorage.setItem('currentChat', roomName);

                socket.emit('join', {
                  name: localStorage.getItem('name'),
                  room: roomName
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
            })
            .catch(err => console.log(err));
        } else {

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
    })
    .catch(err => console.log(err));
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
