import React from 'react';
import './Login.css'

class Login extends React.Component {

    constructor(props) {
        super(props);
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
                        <form style={{display:"flex", justifyContent:"center", alignContent:"center", flexDirection:"column"}}>

                            <input type="text" placeholder="Email" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                            <input type="text" placeholder="Password" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                            <button style={{borderRadius:"5px", height: "3vw", width: "100%", fontSize:"2vw", backgroundColor: "blue", opacity:"0.5"}}>Submit</button>

                        </form>
                    </div>
                </div>
            </div>
            );
    }
}

export default Login;