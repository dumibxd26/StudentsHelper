import React, { useEffect, useState} from 'react';
import io from 'socket.io-client';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTextArea,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBCardHeader,
} from "mdb-react-ui-kit";

const socket = io('http://localhost:5001');

export default function Kok() {

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
                    return [...prevState, {message: data['message'], sender: data['name'], time: data['time']}];
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
              return [...prevState, {message: data['message'], sender: data['name'], time: data['time']}];
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

      socket.emit('message', {message: document.getElementById("messageId").value,
                             room: localStorage.getItem('currentChat'), name: user,
                              time: new Date().toLocaleTimeString()});
      
      setMessages(prevState => {
        return [...prevState, {message: document.getElementById("messageId").value, sender: 'you', time: new Date().toLocaleTimeString()}];
      });

      document.getElementById("messageId").value = "";
    }
  
  const leaveRoom = () => {
    socket.emit('leave', {name: localStorage.getItem('name') ,room: localStorage.getItem('currentChat')});
    localStorage.removeItem('currentChat');
  }

  return (
    <MDBContainer fluid className="py-5" style={{ backgroundColor: "#eee" }}>
      <MDBRow>

        <MDBCol>
          <MDBTypography listUnStyled>

            {messages.map((message, index) => {
                return (
                    message.sender == 'you' ? 
                  
                    <li class="d-flex justify-content-between mb-4">
                    <MDBCard className="w-100" style={{marginLeft:"10em"}}>
                      <MDBCardHeader className="d-flex justify-content-between p-3">
                        <p class="fw-bold mb-0">you</p>
                        <p class="text-muted small mb-0">
                          <MDBIcon far icon="clock" /> {message.time}
                        </p>
                      </MDBCardHeader>
                      <MDBCardBody>
                        <p className="mb-0">
                          {message.message}
                        </p>
                      </MDBCardBody>
                    </MDBCard>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                      width="60"
                    />
                  </li>
                  :
                  <li className="d-flex justify-content-between mb-4">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                    alt="avatar"
                    className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                    width="60"
                  />
                  <MDBCard className="w-100" style={{marginRight:"10em"}}>
                    <MDBCardHeader className="d-flex justify-content-between p-3">
                      <p className="fw-bold mb-0">{message.sender}</p>
                      <p className="text-muted small mb-0">
                        <MDBIcon far icon="clock" /> {message.time}
                      </p>
                    </MDBCardHeader>
                    <MDBCardBody>
                      <p className="mb-0">
                        {message.message}
                      </p>
                    </MDBCardBody>
                  </MDBCard>
                </li>
                )
            })}

            <li className="bg-white mb-3">
              <MDBTextArea label="Message" id="messageId" rows={4} />
            </li>

            <MDBBtn color="info" rounded className="float-end" onClick={handleClick}>
              Send
            </MDBBtn>

            <MDBBtn color="info" rounded className="float-start" onClick={leaveRoom}>
              Leave Chat
            </MDBBtn>


          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}