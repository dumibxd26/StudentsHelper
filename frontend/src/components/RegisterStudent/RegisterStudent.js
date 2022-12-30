import React from 'react';
import './RegisterStudent.css'

class Register extends React.Component {

    constructor(props) {
        super(props);
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
                        <form style={{display:"flex", justifyContent:"center", alignContent:"center", flexDirection:"column"}}>
                        <input type="text" placeholder="First name" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="text" placeholder="Last name" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>    
                        <input type="text" placeholder="Email" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="text" placeholder="Password" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="text" placeholder="College" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="GPA ex 9.75" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="ONI points" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="ONM points" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        <input type="number" placeholder="ONF points" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>
                        
                        <div>
                            <label for="workGoogle" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", color:"white"}}> Worked at Google? </label>
                            <input type="checkbox" id="workGoogle" name="workGoogle" value="workGoogle" style={{width:"1.5vw", height:"1.5vw"}}/>
                        </div>

                        <div>
                            <label for="workMeta" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", color:"white"}}> Worked at Meta? </label>
                            <input type="checkbox" id="workMeta" name="workMeta" value="workMeta" style={{width:"1.5vw", height:"1.5vw"}}/>
                        </div>

                        <div>
                            <label for="workBloomberg" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", color:"white"}}> Worked at Bloomberg? </label>
                            <input type="checkbox" id="workBloomberg" name="workBloomberg" value="workBloomberg" style={{width:"1.5vw", height:"1.5vw"}}/>
                        </div>

                        <div>
                            <label for="workAmazon" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", color:"white"}}> Worked at Amazon? </label>
                            <input type="checkbox" id="workAmazon" name="workAmazon" value="workAmazon" style={{width:"1.5vw", height:"1.5vw"}}/>
                        </div>

                        <div>
                            <label for="workMicrosoft" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", color:"white"}}> Worked at Microsoft? </label>
                            <input type="checkbox" id="workMicrosoft" name="workMicrosoft" value="workMicrosoft" style={{width:"1.5vw", height:"1.5vw"}}/>
                        </div>

                        <div>
                            <label for="workApple" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", color:"white"}}> Worked at Apple? </label>
                            <input type="checkbox" id="workApple" name="workApple" value="workApple" style={{width:"1.5vw", height:"1.5vw"}}/>
                        </div>

                        <div>
                            <label for="workHedgeFund" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", color:"white"}}> Worked at Hedge Fund Company? </label>
                            <input type="checkbox" id="workHedgeFund" name="workHedgeFund" value="workHedgeFund" style={{width:"1.5vw", height:"1.5vw"}}/>
                        </div>
                                
                        <input type="text" placeholder="Other companies you worked at" style={{borderRadius:"5px", marginBottom:"1vw", height: "2vw", width: "100%", fontSize:"2vw", backgroundColor: "white", opacity:"0.5"}}/>

                       <button style={{borderRadius:"5px", height: "3vw", width: "100%", fontSize:"2vw", backgroundColor: "blue", opacity:"0.5"}}>Submit</button>

                        </form>
                    </div>
                </div>
            </div>
            );
    }
}

export default Register;