import React from "react";

import io from "socket.io-client";

class Sockot extends React.Component {
  constructor(props) {
    super(props);

    const socket = io.connect('http://localhost:5000');

    socket.on('connect', function() {
        socket.send('User has connected!');
        }
    );

    socket.on('message', function(data) {
      console.log(data);
        this.setState(prevState => {
          return {message: prevState.message + " " + data}
      });
      }
    );

    this.state = {
      message: "",
      socket: socket
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = (e) => {
    e.preventDefault();
    
    // console.log(document.getElementById("message").value)

    let value = document.getElementById("message").value;
    
    this.setState(prevState => {
        return {message: prevState.message + " " + value}
    });

    this.state.socket.send(this.state.message);

    document.getElementById("message").value = "";
    }
  


  render() {
    return (
      <>


        <form>
            <div style={{fontSize:"30px", margin:"10px"}}>{this.state.message}</div>

            <input type="text" id="message" />
            <button onClick={this.handleClick}>Send</button>
        </form>
      </>
    );
  }
}

export default Sockot;