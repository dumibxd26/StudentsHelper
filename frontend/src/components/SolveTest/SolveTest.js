import React from "react";

import "./SolveTest.css";

class SolveTest extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
            data: null,
            solvedTest: false,
            correctAnswers: null,
            userAnswers: null,
            correctAnswersNumber: 0
        }
    }

    componentDidMount() {
       
        fetch("http://localhost:5000/getRandomTest", {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        })
        .then(response => response.json())
        .then(info => {
            this.setState({data: info.data});
        }
        )
        .catch(error => {
            console.log(error);
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userAnswers = {
            "id": this.state.data.id,
            "Q1A": document.getElementById("Q1A").value == "" ? " " : document.getElementById("Q1A").value,
            "Q2A": document.getElementById("Q2A").value == "" ? " " : document.getElementById("Q2A").value,
            "Q3A": document.getElementById("Q3A").value == "" ? " " : document.getElementById("Q3A").value,
            "Q4A": document.getElementById("Q4A").value == "" ? " " : document.getElementById("Q4A").value,
            "Q5A": document.getElementById("Q5A").value == "" ? " " : document.getElementById("Q5A").value,
            "Q6A": document.getElementById("Q6A").value == "" ? " " : document.getElementById("Q6A").value,
            "Q7A": document.getElementById("Q7A").value == "" ? " " : document.getElementById("Q7A").value,
            "Q8A": document.getElementById("Q8A").value == "" ? " " : document.getElementById("Q8A").value,
            "Q9A": document.getElementById("Q9A").value == "" ? " " : document.getElementById("Q9A").value,
            "Q10A": document.getElementById("Q10A").value == "" ? " " : document.getElementById("Q10A").value,
        }

        this.setState({userAnswers: userAnswers});

        fetch("http://localhost:5000/checkTestAnswer", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userAnswers)
        })
        .then(response => response.json())
        .then(info => {
            // this.setState({solvedTest: true});
            this.setState({correctAnswers: info.data});
            this.setState({correctAnswersNumber: info.correctAnswersNumber});
            
            let id = null;

            const JWT = localStorage.getItem("token");

            fetch("http://localhost:5000/checkTokenForFrontend/" + JWT, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            })
            .then(response => response.json())
            .then(info => {
                id = info.id;
                // call to the api to modify the user
                // basically adding the test to his solved tests list
                fetch("http://localhost:5000/updateStudent/" + id, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json",
                                "x-access-token": JWT},
                    body: JSON.stringify({ "addTest": this.state.correctAnswersNumber })
                })
                .then(() => this.setState({solvedTest: true}))

            })
            
        })
        .catch(error => {
            console.log(error);
        });
    }


    render() {
        return (
        <>
        { this.state.data != null &&

            <form style={{marginLeft: "1.5em"}}>

                {this.state.solvedTest && <p className="finalMessage">Correct Answers Number: {this.state.correctAnswersNumber}</p>}

                <div>
                    <p className="questionClass"> {this.state.data["Q1"]} </p>

                    { !this.state.solvedTest &&
                        <input className="styleInput" type="text" name="Q1A" id="Q1A" />
                    }

                    { this.state.solvedTest &&
                        <>
                        <input className="styleInput" type="text" value={`Your answer: ${this.state.userAnswers["Q1A"]}`} disabled></input>
                        <p>Correct Answer: <span style={{color:"green"}}>{this.state.correctAnswers["Q1A"]} </span></p>
                        </>
                    }

                </div>
                    <p className="questionClass"> {this.state.data["Q2"]} </p>
                    
                    { !this.state.solvedTest &&
                        <input className="styleInput" type="text" name="Q2A" id="Q2A" />
                    }

                    { this.state.solvedTest &&
                        <>
                        <input className="styleInput" type="text" value={`Your answer: ${this.state.userAnswers["Q2A"]}`} disabled></input>
                        <p>Correct Answer: <span style={{color:"green"}}>{this.state.correctAnswers["Q2A"]} </span></p>
                        </>
                    }

                <div>
                    <p className="questionClass"> {this.state.data["Q3"]} </p>

                    { !this.state.solvedTest &&
                        <input className="styleInput" type="text" name="Q3A" id="Q3A" />
                    }

                    { this.state.solvedTest &&
                        <>
                        <input className="styleInput" type="text" value={`Your answer: ${this.state.userAnswers["Q3A"]}`} disabled></input>
                        <p>Correct Answer: <span style={{color:"green"}}>{this.state.correctAnswers["Q3A"]} </span></p>
                        </>
                    }

                </div>

                <div>
                    <p className="questionClass"> {this.state.data["Q4"]} </p>

                    { !this.state.solvedTest &&
                        <input className="styleInput" type="text" name="Q4A" id="Q4A" />
                    }

                    { this.state.solvedTest &&
                        <>
                        <input className="styleInput" type="text" value={`Your answer: ${this.state.userAnswers["Q4A"]}`} disabled></input>
                        <p>Correct Answer: <span style={{color:"green"}}>{this.state.correctAnswers["Q4A"]} </span></p>
                        </>
                    }

                </div>

                <div>
                    <p className="questionClass"> {this.state.data["Q5"]} </p>
                    
                    { !this.state.solvedTest &&
                        <input className="styleInput" type="text" name="Q5A" id="Q5A" />
                    }

                    { this.state.solvedTest &&
                        <>
                        <input className="styleInput" type="text" value={`Your answer: ${this.state.userAnswers["Q5A"]}`} disabled></input>
                        <p>Correct Answer: <span style={{color:"green"}}>{this.state.correctAnswers["Q5A"]} </span></p>
                        </>
                    }

                </div>

                <div>
                    <p className="questionClass"> {this.state.data["Q6"]} </p>
                    
                    { !this.state.solvedTest &&
                        <input className="styleInput" type="text" name="Q6A" id="Q6A" />
                    }

                    { this.state.solvedTest &&
                        <>
                        <input className="styleInput" type="text" value={`Your answer: ${this.state.userAnswers["Q6A"]}`} disabled></input>
                        <p>Correct Answer: <span style={{color:"green"}}>{this.state.correctAnswers["Q6A"]} </span></p>
                        </>
                    }

                </div>

                <div>
                    <p className="questionClass"> {this.state.data["Q7"]} </p>
                    
                    { !this.state.solvedTest &&
                        <input className="styleInput" type="text" name="Q7A" id="Q7A" />
                    }

                    { this.state.solvedTest &&
                        <>
                        <input className="styleInput" type="text" value={`Your answer: ${this.state.userAnswers["Q7A"]}`} disabled></input>
                        <p>Correct Answer: <span style={{color:"green"}}>{this.state.correctAnswers["Q7A"]} </span></p>
                        </>
                    }

                </div>

                <div>
                    <p className="questionClass"> {this.state.data["Q8"]} </p>
                    
                    { !this.state.solvedTest &&
                        <input className="styleInput" type="text" name="Q8A" id="Q8A" />
                    }
                    
                    { this.state.solvedTest &&
                        <>
                        <input className="styleInput" type="text" value={`Your answer: ${this.state.userAnswers["Q8A"]}`} disabled></input>
                        <p>Correct Answer: <span style={{color:"green"}}>{this.state.correctAnswers["Q8A"]} </span></p>
                        </>
                    }

                </div>

                <div>
                    <p className="questionClass"> {this.state.data["Q9"]} </p>
                    
                    { !this.state.solvedTest &&
                        <input className="styleInput" type="text" name="Q9A" id="Q9A" />
                    }

                    { this.state.solvedTest &&
                        <>
                        <input className="styleInput" type="text" value={`Your answer: ${this.state.userAnswers["Q9A"]}`} disabled></input>
                        <p>Correct Answer: <span style={{color:"green"}}>{this.state.correctAnswers["Q9A"]} </span></p>
                        </>
                    }

                </div>

                <div>
                    <p className="questionClass"> {this.state.data["Q10"]} </p>
                    
                    { !this.state.solvedTest &&
                        <input className="styleInput" type="text" name="Q10A" id="Q10A" />
                    }

                    { this.state.solvedTest &&
                        <>
                        <input className="styleInput" type="text" value={`Your answer: ${this.state.userAnswers["Q10A"]}`} disabled></input>
                        <p>Correct Answer: <span style={{color:"green"}}>{this.state.correctAnswers["Q10A"]} </span></p>
                        </>
                    }

                </div>

                {!this.state.solvedTest && <button className="styleButton" onClick={this.handleSubmit}>Submit</button> }
            </form>
        
        }
        </>
        );
    }
}

export default SolveTest;