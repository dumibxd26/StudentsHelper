import React from 'react';
import HomepageNotAuth from './components/HomepageNotAuth/HomepageNotAuth.js';
//import HomepageAuth from './components/HomepageAuth/HomepageAuth.js';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./components/About/About";
import NavbarComponent from './components/Navbar/Navbar.js';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showHompageNotAuth: true,
    }
  }

  handleNotAuthVisibility = () => {
    this.setState({showHompageNotAuth: false});
  }

  render() {
    return ( <>

      {/* {this.state.showHompageNotAuth && <HomepageNotAuth visibilityInParent={this.handleNotAuthVisibility}/> } */}

      {this.state.showHompageNotAuth &&

        <Router>
          <NavbarComponent/>
          <Routes>
            
              <Route exact path="/about" element={<About />}/>

          </Routes>
        </Router>
      }
    </>);
  }

}

export default App;
