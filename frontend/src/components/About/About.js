import React from "react";
import "./About.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class About extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        userType: "student",
        showEditButton: false,
        didEdit: false,
        userId: null,
        data: null,
    }
  }

  componentDidMount() {

    let id = null;
    let URL = "http://localhost:5000/";
    const JWT = localStorage.getItem("token");

    if (!JWT) {
      return ;
    }

    fetch(URL + "checkTokenForFrontend/" + JWT, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    })
    .then((res) => res.json())
    .then((data) => {
        this.setState({userType: data.userType});

        URL += "get"
        if (data.userType === "student") {
            URL += "Student/";
        } else {
            URL += "Helper/";
        }

        URL += data.id;

        fetch(URL, {
            method: "GET",
            headers: {"Content-Type": "application/json",
            "x-access-token": JWT}
        })
        .then((res) => res.json())
        .then((data) => {
            this.setState({data: data.data});
            this.setState({showEditButton: data.modify});

            console.log(data);
        });

    })
    .catch((err) => console.log(err));
  }

  handleClick = () => {
    this.setState({didEdit: true});
  }


  render() {
    return (
        <>
          {this.state.data != null &&
            <div className="bigBox">

                <div className="smallBox d-flex">
                    <img src="http://i.imgur.com/YfVliti.png" className="styleAvatar"/>
                    <div className="infos">
                        <p> Firstname: {this.state.data['firstName']}</p>
                        <p> Lastname: {this.state.data['lastName']}</p>
                        {this.state.userType == "helper" &&
                        <>
                            <p> College: {this.state.data['college']}</p>
                            <p> Faculty: {this.state.data['faculty']}</p>

                            { this.state.data['workGoogle'] == true &&
                              <p> Worked at Google </p>
                            }

                            { this.state.data['workMeta'] == true &&
                              <p> Worked at Meta </p>
                            }

                            { this.state.data['workAmazon'] == true &&
                              <p> Worked at Amazon </p>
                            }

                            { this.state.data['workMicrosoft'] == true &&
                              <p> Worked at Microsoft </p>
                            }

                            { this.state.data['workApple'] == true &&
                              <p> Worked at Apple </p>
                            }

                            { this.state.data['workBloomberg'] == true &&
                              <p> Worked at Bloomberg </p>
                            }

                            {
                              this.state.data['workHedgeFund'] == true &&
                              <p> Worked at a Hedge Funds Company </p>
                            }

                            {
                              JSON.stringify(this.state.data['workingCompanies']).length > 2 &&
                              <p> Other companies where he/she worked at: {this.state.data['workingCompanies']}</p>
                            }
                            
                        </>
                        }

                        {this.state.userType === "student" &&
                        <>
                          <p>School: {this.state.data['school']}</p>
                          <p>Test Score: {this.state.data['testsScore']}</p>
                          <p>Tests Solved: {this.state.data['testsSolved']}</p>
                        </>
                        }
                        <p> GPA: {this.state.data['GPA']}</p>
                        <p> Contest Score: {this.state.data['contestsScore']}</p>
                    </div>
                    
                </div>
                
                <p style={{paddingLeft:"3vw", fontSize:"2vw"}}>Description: </p>

                { this.state.showEditButton == true &&
                  <button className="btn btn-primary" style={{marginLeft:"3vw"}} onClick={this.handleClick}>
                    {this.state.didEdit == false ? "Edit" : "Save changes"}
                  </button>
                }
            </div>
        }
        </>
      );
  }

}

export default About;