import React from "react";

import HelpersTable from "./HelpersTable";
import HelperFilters from "./HelperFilters";

class FindMatch extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      didFilter: false,
    }

    // bind setDidFilter

    this.setDidFilter = this.setDidFilter.bind(this);
  }

  setDidFilter() {
    
    this.setState({didFilter: true})
  }

  componentDidMount() {

    if (this.props.userType != "student") {
      window.location.href = "http://localhost:3000";
      return ;
    }

    


  }

  render() {
    return (
      <>
        {this.state.didFilter ? <HelpersTable /> : <HelperFilters setDidFilter={this.setDidFilter}/>}
      </>
    );
  }

}

export default FindMatch;