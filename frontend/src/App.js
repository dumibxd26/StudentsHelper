import React from 'react';
import HomepageNotAuth from './components/HomepageNotAuth/HomepageNotAuth.js';
//import HomepageAuth from './components/HomepageAuth/HomepageAuth.js';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./components/About/About";
import NavbarComponent from './components/Navbar/Navbar.js';
import Chat from './components/SocketIO/Chat.js';
import SolveTest from './components/SolveTest/SolveTest.js';

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
          {this.state.userType}
          <Routes>
            
              <Route exact path="/about" element={<About />}/>
              <Route exact path="/chat" element={<Chat />}/>
              <Route exact path="/solve" element={<SolveTest/>}/>

          </Routes>
        </Router>
      }


    </>);
  }

}

export default App;
