import React from 'react';
import './Login.css'

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        const email = event.target.email.value;
        const password = event.target.password.value;

        let url = "http://localhost:5000/login";
        if (this.props.isHelper) {
            url += "Helper";
        } else {
            url += "Student";
        }
        const data = {
            email: email,
            password: password
        }

        console.log(this.props.isHelper);
        console.log(url)
        console.log(data)

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(info => {
            
            if (info.message === "logged in") {
                this.props.visibilityInParent();
                
                console.log(info)
                const token = info.token;

                const name = info.firstName + " " + info.lastName;

                localStorage.setItem('token', token);
                localStorage.setItem('name', name);

                window.location.reload();
            }
        }
        )
        .catch(error => {
            console.log(error);
        });

    }

    render() {
        return (
            <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}>
                <div className={'borderLogin'}>
                    <div style={{fontSize:"3vw", color:"white", width:"100%",
                                display:"flex", justifyContent:"center",
                                marginTop:"2vw", marginBottom:"3vw"
                                }}>Login</div>
                    
                
                    <div style={{display:"flex", justifyContent:"center", alignContent:"center"}}>
                        <form style={{display:"flex", justifyContent:"center", alignContent:"center", flexDirection:"column"}} onSubmit={this.handleSubmit}>

                            <input type="text" placeholder="Email" name="email" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                            <input type="text" placeholder="Password" name="password" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                            <button style={{borderRadius:"5px", height: "3vw", width: "100%", fontSize:"2vw", backgroundColor: "blue", opacity:"0.5"}}>Submit</button>

                        </form>
                    </div>
                </div>
            </div>
            );
    }
}

export default Login;