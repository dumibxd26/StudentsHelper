import React from "react";

class HelperFilters extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
       <>
       <button onClick={this.props.setDidFilter()}>clik my</button>
       </>
    );
  }

}

export default HelperFilters;