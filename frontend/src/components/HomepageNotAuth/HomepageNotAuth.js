import React from "react";

import Login from "../Login/Login.js";

import RegisterElev from "../RegisterElev/RegisterElev.js";
import RegisterHelper from "../RegisterHelper/RegisterHelper";

class HomepageNotAuth extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isElev: false,
      isHelper: false,
      didChooseType: false,
      isLogin: false,
      isRegister: false,
      hide2Buttons: false,
    };
  }

  handleFirstButton = (event) => {
    event.preventDefault();

    if (!this.state.didChooseType) {
      this.setState({isHelper: true});
      this.setState({didChooseType: true});
    } else {
      this.setState({isLogin: true});
      this.setState({hide2Buttons: true});
      // this.props.visibilityInParent();
    }
  }

  handleSecondButton = (event) => {
    event.preventDefault();
    
    if (!this.state.didChooseType) {
      this.setState({isElev: true});
      this.setState({didChooseType: true});
    } else {
      this.setState({isRegister: true});
      this.setState({hide2Buttons: true});
      // this.props.visibilityInParent();
    }
  }

  render() {
    return (
    <>
        <div style={{display: this.state.hide2Buttons ? "none" : "initial" }}>
          <div style={{height:"10vw", display: "flex", justifyContent:"center"}}><p style={{fontSize:"3vw"}}>Eu sunt:</p></div>

          <form style={{display: "flex", justifyContent: "center", alignItems: "center"}}>

            <button style={{height: "50vw", width: "50%", fontSize:"5vw", backgroundColor: "blue", opacity:"0.5"}}
              onClick={this.handleFirstButton}>
                <p style={{color:"black"}}>
                  {this.state.didChooseType ? "Login" : "Student"} </p>
            </button>

            <button style={{height: "50vw", width: "50%", fontSize:"5vw" }} onClick={this.handleSecondButton}>
              <p>{this.state.didChooseType ? "Register" : "Elev"}</p>
            </button>

          </form>
        </div>
        
        <div style={{display: this.state.hide2Buttons && this.state.isLogin ? "initial" : "none" }}>
          <Login visibilityInParent={this.props.visibilityInParent} isHelper={this.state.isHelper}/>
        </div>

        <div style={{display: this.state.hide2Buttons && this.state.isRegister && this.state.isElev ? "initial" : "none" }}>
          <RegisterElev visibilityInParent={this.props.visibilityInParent}/>
        </div>
        
        <div style={{display: this.state.hide2Buttons && this.state.isRegister && this.state.isHelper ? "initial" : "none" }}>
          <RegisterHelper visibilityInParent={this.props.visibilityInParent}/>
        </div>
        
    </>
    );
  }
}

export default HomepageNotAuth;