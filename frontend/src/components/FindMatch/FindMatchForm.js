import React from "react";

import "./FindMatchForm.css";

class FindMatchForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      didFilter: false,
    }
  }

  componentDidMount() {

    if (this.props.userType != "student") {
      window.location.href = "http://localhost:3000";
      return ;
    }

  }

  handleSubmit = (event) => {
    // event.preventDefault();
    // console.log("submit");

    const college = document.getElementById("college").value;
    const faculty = document.getElementById("exampleFormControlInput1").value;

    const google = document.getElementById("Google").checked;
    const meta = document.getElementById("Meta").checked;
    const bloomberg = document.getElementById("Bloomberg").checked;
    const amazon = document.getElementById("Amazon").checked;
    const microsoft = document.getElementById("Microsoft").checked;
    const apple = document.getElementById("Apple").checked;
    const hedgeFund = document.getElementById("HedgeFund").checked;

    const otherCompanies = document.getElementById("otherCompanies").value;

    const data = {
      "college": college,
      "faculty": faculty,
      "workGoogle": google,
      "workMeta": meta,
      "workBloomberg": bloomberg,
      "workAmazon": amazon,
      "workMicrosoft": microsoft,
      "workApple": apple,
      "workHedgeFund": hedgeFund,
      "workingCompanies": otherCompanies,
    }
    
    fetch("http://localhost:5000/getHelpersByRequirements", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(info => {
      console.log(info);

      console.log(data);
      this.setState({data: data});

      // put the data in localstoarge (5mb of localstorage = 5million characters(it can hold a lot of users))
      localStorage.setItem("data", JSON.stringify(info));

      // redirect to the helpers table
      window.location.href = "http://localhost:3000/filterdHelpers";
    });

  }

  render() {
    return (
      <form>

        <div class="form-group">
          <label for="college"><p className="stylePtag">College: </p></label>
          <input class="form-control" id="college" placeholder="ex: UPB, UTCN, UB, UBB" />
        </div>

        <div class="form-group">
          <label for="exampleFormControlInput1"><p className="stylePtag">College: </p></label>
          <input class="form-control" id="exampleFormControlInput1" placeholder="ex: CTI, informatica, matematica-informatica" />
        </div>

        <div class="form-group">
          <p className="stylePtag">Companies worked at:</p>

          <div className="d-flex flex-column">

            <div className="styleBoxex">
              <input class="form-check-input" type="checkbox" id="Google" value="option1"/>
              <label class="form-check-label" for="Google">Google</label> <br/>
            </div>
            
            <div className="styleBoxex">
              <input class="form-check-input" type="checkbox" id="Meta" value="option1"/>
              <label class="form-check-label" for="Meta">Meta</label>
            </div>

            <div className="styleBoxex">
              <input class="form-check-input" type="checkbox" id="Bloomberg" value="option1"/>
              <label class="form-check-label" for="Bloomberg">Bloomberg</label>
            </div>

            <div className="styleBoxex">
              <input class="form-check-input" type="checkbox" id="Amazon" value="option1"/>
              <label class="form-check-label" for="Amazon">Amazon</label>
            </div>

            <div className="styleBoxex">
              <input class="form-check-input" type="checkbox" id="Microsoft" value="option1"/>
              <label class="form-check-label" for="Microsoft">Microsoft</label>
            </div>

            <div className="styleBoxex">
              <input class="form-check-input" type="checkbox" id="Apple" value="option1"/>
              <label class="form-check-label" for="Apple">Apple</label>
            </div>

            <div className="styleBoxex">
              <input class="form-check-input" type="checkbox" id="HedgeFund" value="option1"/>
              <label class="form-check-label" for="HedgeFund">HedgeFund</label>
            </div>
          </div>

        </div>

        <div class="form-group">
          <label for="otherCompanies"><p className="stylePtag">Other Working companies: </p></label>
          <input class="form-control" id="otherCompanies" placeholder="ex: Lenovo, IBM " />
        </div>

        <button type="button" class="btn btn-success" style={{marginTop:"1em"}} onClick={this.handleSubmit}>
          Find Student</button>

      </form>
    );
  }

}

export default FindMatchForm;