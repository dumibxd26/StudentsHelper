import React from 'react';
import HomepageNotAuth from './components/HomepageNotAuth/HomepageNotAuth.js';
//import HomepageAuth from './components/HomepageAuth/HomepageAuth.js';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./components/About/About";
import NavbarComponent from './components/Navbar/Navbar.js';
import Chat from './components/SocketIO/Chat.js';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showHompageNotAuth: true,
      userType: null
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
    })
    .catch(error => {
      console.log(error);
    });

  }

  render() {
    return ( <>

      {this.state.showHompageNotAuth && <HomepageNotAuth visibilityInParent={this.handleNotAuthVisibility}/> }

      {!this.state.showHompageNotAuth &&

        <Router>
          <NavbarComponent/>
          {this.state.userType}
          <Routes>
            
              <Route exact path="/about" element={<About />}/>
              <Route exact path="/chat" element={<Chat />}/>

          </Routes>
        </Router>
      }


    </>);
  }

}

export default App;
