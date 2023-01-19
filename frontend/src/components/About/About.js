import React from "react";
import "./About.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class About extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        userType: null,
        showEditButton: false,
        buttonPressedOnce: false,
        isEditing: false,
        userId: null,
        data: null,
        userID: null,
    }
  }

  componentDidMount() {

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

        this.setState({userId: data.id});

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

    if (!this.state.buttonPressedOnce) {
      this.setState({isEditing: true});

      this.setState({buttonPressedOnce: true});
      return ;
    }

    const JWT = localStorage.getItem("token");

    if (!JWT) {
      return ;
    }

    if (this.state.isEditing) {

      let URL = "http://localhost:5000/update";

      const userTypeReq = this.state.userType === "student" ? "Student/" : "Helper/";

      URL += userTypeReq + this.state.userId;

      fetch(URL, {
        method: "PUT",
        headers: {"Content-Type": "application/json",
        "x-access-token": JWT},
        body: JSON.stringify({
          firstName: document.getElementsByName("firstname")[0].value ? document.getElementsByName("firstname")[0].value : '',
          lastName: document.getElementsByName("lastname")[0].value ? document.getElementsByName("lastname")[0].value : '',
          GPA: document.getElementsByName("GPA")[0].value ? document.getElementsByName("GPA")[0].value : 0,
          description: document.getElementById('description').value ? document.getElementById('description').value : '',
        })
        }
      )
      .then((res) => res.json())
      .then((data) => {
        if (data.data)
          // this.setState({data: data.data});
          this.state.data.firstName = data.data.firstName;
          this.state.data.lastName = data.data.lastName;
          this.state.data.GPA = data.data.GPA;
          this.state.data.description = data.data.description;

          // for rerendering
          this.setState((prevData) => ({data: prevData.data}));
      })
      .catch((err) => console.log(err));

      this.setState({isEditing: false});
      return;
    }

    this.setState({isEditing: true});
   
  }


  render() {
    return (
        <>
          {this.state.data != null &&
            <div className="bigBox">

                <div className="smallBox d-flex">
                    <img src="http://i.imgur.com/YfVliti.png" className="styleAvatar"/>
                    <div className="infos">
                        <p> Firstname:
                        { this.state.isEditing == true ?
                          <input type="text" name="firstname" defaultValue={this.state.data['firstName']}
                            className='styleInput' /> :
                          ' ' + this.state.data['firstName']
                        }
                        </p>

                        <p> Lastname:
                          { this.state.isEditing == true ?
                            <input type="text" name="lastname" defaultValue={this.state.data['lastName']}
                            className='styleInput' /> :
                            ' ' + this.state.data['lastName']
                          }
                        </p>
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
                              this.state.data['workingCompanies'] && this.state.data['workingCompanies'].length > 2 &&
                              <p> Other companies where he/she worked at: {this.state.data['workingCompanies']}</p>
                            }
                            
                        </>
                        }

                        { this.state.userType === "student" &&
                        <>
                          <p>School: {this.state.data['school']}</p>
                          <p>Test Score: {this.state.data['testsScore'] / this.state.data['testsSolved']}</p>
                          <p>Tests Solved: {this.state.data['testsSolved']}</p>
                        </>
                        }
                        <p> GPA:
                          { this.state.isEditing == false ?
                              ' ' + this.state.data['GPA'] :
                              <input type="text" name="GPA" defaultValue={this.state.data['GPA']}
                              className='styleInput' />
                          }
                        </p>
                        <p> Contest Score: {this.state.data['contestsScore']}</p>
                    </div>
                    
                </div>
                
                <p style={{paddingLeft:"3vw", fontSize:"2vw"}}>Description: </p>
                
                { this.state.isEditing == false ?
                  <p style={{paddingLeft:"3vw", fontSize:"1.5vw"}}> {this.state.data['description']} </p> :
                  <textarea
                  style={{marginLeft:"3vw", fontSize:"1.5vw"}}
                  name="description"
                  id="description"
                  defaultValue={this.state.data['description']}
                  rows={4}
                  cols={40}
                  className='styleInput'
                 />
                }
                <br/>
                { this.state.showEditButton == true &&
                  <button className="btn btn-light" style={{marginLeft:"3vw"}} onClick={this.handleClick}>
                    {this.state.isEditing == false ? "Edit" : "Save changes"}
                  </button>
                }
            </div>
        }
        </>
      );
  }

}

export default About;