import React from 'react';
import './RegisterElev.css'

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const firstName = document.querySelector('#firstName').value
        const lastName = document.querySelector('#lastName').value;
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const school = document.querySelector('#school').value;
        const gpa = document.querySelector('#gpa').value;
        const oniPoints = document.querySelector('#oniPoints').value;
        const onmPoints = document.querySelector('#onmPoints').value;
        const onfPoints = document.querySelector('#onfPoints').value;
        const grigorePoints = document.querySelector('#grigorePoints').value;
        const phiPoints = document.querySelector('#phiPoints').value;
        const ojiPoints = document.querySelector('#ojiPoints').value;
        const ojmPoints = document.querySelector('#ojmPoints').value;
        const ojfPoints = document.querySelector('#ojfPoints').value;

        const contestsScore = parseInt(oniPoints * 2, 10) +
                        parseInt(onmPoints * 20, 10) +
                        parseInt(onfPoints * 20, 10) +
                        parseInt(grigorePoints, 10) +
                        parseInt(phiPoints / 2, 10) +
                        parseInt(ojiPoints, 10) +
                        parseInt(ojmPoints * 10, 10) +
                        parseInt(ojfPoints * 10, 10); 
        const testsSolved = 0;
        const testsScore = 0;

        const data = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
            "GPA": gpa,
            "contestsScore": contestsScore,
            "testsSolved": testsSolved,
            "testsScore": testsScore,
            "school": school
        }

        console.log(data);
        
        fetch('http://localhost:5000/registerStudent', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(info => {
            if (info.message == "created") {
                this.props.visibilityInParent();
                
                console.log(info)
                const token = info.token;

                localStorage.setItem('token', token);
                localStorage.setItem('name', firstName + " " + lastName);

                window.location.reload();
            }
        }
        )
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}>
                <div className={'borderRegElev'}>
                    <div style={{fontSize:"3vw", color:"white", width:"100%",
                                display:"flex", justifyContent:"center",
                                marginTop:"1vw", marginBottom:"3vw"
                                }}>Register</div>
                    
                
                    <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}>
                        <form style={{display:"flex", justifyContent:"center", alignContent:"center", flexDirection:"column"}} onSubmit={this.handleSubmit}>

                        <input type="text" placeholder="First name" id="firstName"
                         style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="text" placeholder="Last name" id="lastName"
                         style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>    
                        <input type="text" placeholder="Email" id="email"
                        style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="text" placeholder="Password" id="password"
                        style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="text" placeholder="School" id="school"
                        style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="GPA ex 9.75" id="gpa"
                         style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="ONI points" id="oniPoints"
                         style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="ONM points" id="onmPoints"
                         style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="ONF points" id="onfPoints"
                         style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="Grigore Moisil Points" id="grigorePoints"
                         style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="PHI" id="phiPoints"
                         style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="OJI points" id="ojiPoints"
                         style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="OJM points" id="ojmPoints"
                         style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="OJF points" id="ojfPoints"
                         style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>


                        <button type="submit" className={"btn, btn-light"}
                        style={{borderRadius:"5px", height: "3vw", width: "100%", fontSize:"2vw", opacity:"0.5"}}>Submit</button>

                        </form>
                    </div>
                </div>
            </div>
            );
    }
}

export default Register;