import React from "react";
import "./About.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class About extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        userType: "student",
    }
  }

  render() {
    return (
        <>
            <div className="bigBox">

                <div className="smallBox d-flex">
                    <img src="http://i.imgur.com/YfVliti.png" className="styleAvatar"/>
                    <div className="infos">
                        <p> Firstname: </p>
                        <p> Lastname: </p>

                        {this.state.userType === "student" &&
                        <>
                            <p> College: </p>
                            <p> Faculty: </p>
                            <p> GPA: </p>
                            <p> Companies Worked at</p>
                        </>
                        }

                        {this.state.userType === "elev" &&
                          <p>School:</p>
                        }
                        <p> Contests:</p>
                    </div>
                    
                </div>
                
                <p style={{paddingLeft:"3vw", fontSize:"2vw"}}>Description: </p>
            </div>
        </>
      );
  }

}

export default About;