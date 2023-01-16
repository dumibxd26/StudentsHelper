import React from 'react';
import './RegisterHelper.css'

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let workGoogle = false;
        let workMeta = false;
        let workAmazon = false;
        let workMicrosoft = false;
        let workApple = false;
        let workBloomberg = false;
        let workHedgeFund = false;

        // const firstName = document.querySelector('#firstName').value
        // const lastName = document.querySelector('#lastName').value;
        // const email = document.querySelector('#email').value;
        // const password = document.querySelector('#password').value;
        // const college = document.querySelector('#college').value;
        // const faculty = document.querySelector('#faculty').value;
        // const gpa = document.querySelector('#gpa').value;
        // const oniPoints = document.querySelector('#oniPoints').value;
        // const onmPoints = document.querySelector('#onmPoints').value;
        // const onfPoints = document.querySelector('#onfPoints').value;

        // const firstName = document.getElementsByName('firstName')[0].value;
        // const lastName = document.getElementsByName('lastName')[0].value;
        // const email = document.getElementsByName('email')[0].value;
        // const password = document.getElementsByName('password')[0].value;
        // const college = document.getElementsByName('college')[0].value;
        // const faculty = document.getElementsByName('faculty')[0].value;
        // const gpa = document.getElementsByName('gpa')[0].value;
        // const oniPoints = document.getElementsByName('oniPoints')[0].value;
        // const onmPoints = document.getElementsByName('onmPoints')[0].value;
        // const onfPoints = document.getElementsByName('onfPoints')[0].value;

        const firstName = event.target.firstName.value;
        const lastName = event.target.lastName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const college = event.target.college.value;
        const faculty = event.target.faculty.value;
        const gpa = event.target.gpa.value;
        const oniPoints = event.target.oniPoints.value;
        const onmPoints = event.target.onmPoints.value;
        const onfPoints = event.target.onfPoints.value;

        if (document.querySelector('#workGoogle').checked) {
            workGoogle = true;
        }
        if (document.querySelector('#workMeta').checked) {
            workMeta = true;
        }
        if (document.querySelector('#workAmazon').checked) {
            workAmazon = true;
        }
        if (document.querySelector('#workMicrosoft').checked) {
            workMicrosoft = true;
        }
        if (document.querySelector('#workApple').checked) {
            workApple = true;
        }
        if (document.querySelector('#workBloomberg').checked) {
            workBloomberg = true;
        }
        if (document.querySelector('#workHedgeFund').checked) {
            workHedgeFund = true;
        }

        const workingCompanies = document.querySelector('#otherCompanies').value;

        const contestsScore = parseInt(oniPoints * 2, 10) +
                        parseInt(onmPoints * 10, 10) +
                        parseInt(onfPoints * 10, 10);
        
        const data = {
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
            "GPA": gpa,
            "contestsScore": contestsScore,
            "workGoogle": workGoogle,
            "workMeta": workMeta,
            "workAmazon": workAmazon,
            "workMicrosoft": workMicrosoft,
            "workApple": workApple,
            "workBloomberg": workBloomberg,
            "workHedgeFund": workHedgeFund,
            "workingCompanies": workingCompanies,
            "college": college,
            "faculty": faculty
        }

        console.log(data);

        fetch('http://localhost:5000/registerHelper', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
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
        .catch((error) => {
            console.error('Error:', error);
        });

    }


    render() {
        return (
            <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}>
                <div className={'borderRegStud'}>
                    <div style={{fontSize:"3vw", color:"white", width:"100%",
                                display:"flex", justifyContent:"center",
                                marginTop:"1vw", marginBottom:"3vw"
                                }}>Register</div>
                    
                    <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}>

                        <form style={{display:"flex", justifyContent:"center", alignContent:"center", flexDirection:"column"}} onSubmit={this.handleSubmit}>
                            
                            <input type="text" id="firstName" name="firstName" placeholder="First name" className={'styleInputs'}/>
                            <input type="text" id="lastName" name="lastName" placeholder="Last name" className={'styleInputs'}/>    
                            <input type="text" id="email" name="email" placeholder="Email" className={'styleInputs'}/>
                            <input type="text" id="password" name="password" placeholder="Password" className={'styleInputs'}/>
                            <input type="text" id="college" name="college" placeholder="College" className={'styleInputs'}/>
                            <input type="text" id="faculty" name="faculty" placeholder="Faculty" className={'styleInputs'}/>
                            <input type="number" id="gpa" name="gpa" placeholder="GPA ex 9.75" className={'styleInputs'}/>
                            <input type="number" id="oniPoints" name="oniPoints" placeholder="ONI points" className={'styleInputs'}/>
                            <input type="number" id="onmPoints" name="onmPoints" placeholder="ONM points" className={'styleInputs'}/>
                            <input type="number" id="onfPoints" name="onfPoints" placeholder="ONF points" className={'styleInputs'}/>
                            
                            <div>
                                <label for="workGoogle" className={'styleInputs'}> Worked at Google? </label>
                                <input type="checkbox" id="workGoogle" name="workGoogle" value="workGoogle" style={{width:"1.2vmax", height:"1.2vmax"}}/>
                            </div>

                            <div>
                                <label for="workMeta" className={'styleInputs'}> Worked at Meta? </label>
                                <input type="checkbox" id="workMeta" name="workMeta" value="workMeta" style={{width:"1.2vmax", height:"1.2vmax"}}/>
                            </div>

                            <div>
                                <label for="workBloomberg" className={'styleInputs'}> Worked at Bloomberg? </label>
                                <input type="checkbox" id="workBloomberg" name="workBloomberg" value="workBloomberg" style={{width:"1.2vmax", height:"1.2vmax"}}/>
                            </div>

                            <div>
                                <label for="workAmazon" className={'styleInputs'}> Worked at Amazon? </label>
                                <input type="checkbox" id="workAmazon" name="workAmazon" value="workAmazon" style={{width:"1.2vmax", height:"1.2vmax"}}/>
                            </div>

                            <div>
                                <label for="workMicrosoft" className={'styleInputs'}> Worked at Microsoft? </label>
                                <input type="checkbox" id="workMicrosoft" name="workMicrosoft" value="workMicrosoft" style={{width:"1.2vmax", height:"1.2vmax"}}/>
                            </div>

                            <div>
                                <label for="workApple" className={'styleInputs'}> Worked at Apple? </label>
                                <input type="checkbox" id="workApple" name="workApple" value="workApple" style={{width:"1.2vmax", height:"1.2vmax"}}/>
                            </div>

                            <div>
                                <label for="workHedgeFund" className={'styleInputs'}> Worked at Hedge Fund Company? </label>
                                <input type="checkbox" id="workHedgeFund" name="workHedgeFund" value="workHedgeFund" style={{width:"1.2vmax", height:"1.2vmax"}}/>
                            </div>
                                    
                            <input type="text" id="otherCompanies" placeholder="Other companies" className={'styleInputs'}/>

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