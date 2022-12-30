import React from 'react';
import './RegisterElev.css'

class Register extends React.Component {

    constructor(props) {
        super(props);
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
                        <form style={{display:"flex", justifyContent:"center", alignContent:"center", flexDirection:"column"}}>

                        <input type="text" placeholder="First name" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="text" placeholder="Last name" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>    
                        <input type="text" placeholder="Email" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="text" placeholder="Password" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="GPA ex 9.75" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="ONI points" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="ONM points" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="ONF points" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="Grigore Moisil Points" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="PHI" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="OJI points" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="OJM points" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="OJF points" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>


                       <button style={{borderRadius:"5px", height: "3vw", width: "100%", fontSize:"2vw", backgroundColor: "blue", opacity:"0.5"}}>Submit</button>

                        </form>
                    </div>
                </div>
            </div>
            );
    }
}

export default Register;