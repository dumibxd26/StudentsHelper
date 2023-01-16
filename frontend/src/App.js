import React from 'react';
import HomepageNotAuth from './components/HomepageNotAuth/HomepageNotAuth.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import About from "./components/About/About";
import NavbarComponent from './components/Navbar/Navbar.js';
import Chat from './components/SocketIO/Chat.js';
import SolveTest from './components/SolveTest/SolveTest.js';
import FindMatch from './components/FindMatch/FindMatchForm';
import HelpersTable from './components/FindMatch/HelpersTable.js';

// import asd from './components/asd/asd.js';

import io, { Socket } from 'socket.io-client';

const socket = io.connect("http://localhost:5001");

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showHompageNotAuth: true,
      userType: null,
      waitForResponse: false,
    }
  }

  handleNotAuthVisibility = () => {
    this.setState({showHompageNotAuth: false});
  }
    
  componentDidMount() {

    // Joins the room with the same name of the user to receive messages from other users
    socket.emit('join', {name : localStorage.getItem('name'), room : localStorage.getItem('name')});

    if (localStorage.getItem('currentChat') == null) {
      localStorage.removeItem('currentChat');
    }

    const JWT = localStorage.getItem('token');

    // fetch("http://localhost:5000/getAllHelpers", {
    //   method: "GET",
    //   headers: {"Content-Type": "application/json"},
    //   })
    // .then(response => response.json())
    // .then(info => {
    //   console.log(info)
    // })
    // .catch(error => {
    //   console.log(error);
    // });

    // fetch("http://localhost:5000/checkTokenForFrontend", {
    //   method: "POST",
    //   headers: {"Content-Type": "application/json"},
    //   body: JSON.stringify({"token": JWT})
    // })
    // .then(response => response.json())
    // .then(info => {
    //   console.log(info)
    // })
    // .catch(error => {
    //   console.log(error);
    // });

    this.state.waitForResponse = true;

    fetch("http://localhost:5000/checkTokenForFrontend/" + JWT, {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    })
    .then(response => response.json())
    .then(info => {
      
       if (info.message === "Token valid") {
          this.setState({showHompageNotAuth: false});
          this.setState({userType: info.userType});
       }

       this.setState({waitForResponse: false});
    })
    .catch(error => {
      console.log(error);
      this.setState({waitForResponse: false});
    });

  }

  render() {
    return ( <>

      {this.setState.waitForResponse && <p style={{background: "red", height:"1000px", width: "1000px"}}> Stai otara domle</p>}

      {!this.state.waitForResponse && this.state.showHompageNotAuth && <HomepageNotAuth visibilityInParent={this.handleNotAuthVisibility}/> }

      {!this.state.waitForResponse && !this.state.showHompageNotAuth &&

        <Router>
          <NavbarComponent userType={this.state.userType}/>
          <Routes>

              <Route exact path="/" element={<h1 style={{textAlign:"center", fontWeight:"bold"}}>Bun venit, {localStorage.getItem('name')}!</h1>} />
              <Route exact path="/about/:email" element={<About />}/>
              <Route exact path="/chat" element={<Chat />}/>
              <Route exact path="/solve" element={<SolveTest/>}/>
              <Route exact path="/findMatch" element={<FindMatch userType={this.state.userType}/>}/>
              <Route exact path="/filterdHelpers" element={<HelpersTable userType={this.state.userType}/>}/>

              {/* <Route exact path="/asd" element={<asd />} /> */}
     
          </Routes>
        </Router>
      }


    </>);
  }

}

export default App;
