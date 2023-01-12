import React from "react";

class HelperFilters extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayData: null
    }
  }

  componentDidMount()
  {
    const dataString = localStorage.getItem('data')
    const data = JSON.parse(dataString);

    this.setState({displayData: data.data});
  }

  displayWorkingCompanies = (item) => {

      let workingCompanies = "";

      if (item.workingCompanies.length < 3) 
        workingCompanies = workingCompanies + ', ';

      if (item.workGoogle == true) {
        workingCompanies += 'Google';
      }

      if (item.workMeta == true) {
        workingCompanies += ', Meta';
      }

      if (item.workBloomberg == true) {
        workingCompanies += ', Bloomberg';
      }

      if (item.workAmazon == true) {
        workingCompanies += ', Amazon';
      }

      if (item.workMicrosoft == true) {
        workingCompanies += ', Microsoft';
      }

      if (item.workApple == true) {
        workingCompanies += ', Apple';
      }

      if (item.workHedgeFund == true) {
        workingCompanies += ', Hedge Funds Company';
      }

    return workingCompanies;
  }

  render() {
    return (
       <>
      <table class="table table-hover table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name </th>
      <th scope="col">Companies worked at</th>
      <th scope="col">Contests Score </th>
      <th scope="col">GPA </th>
      <th scope="col">Faculty </th>
    </tr>
  </thead>
  <tbody>

=

    { this.state.displayData && this.state.displayData.map((item, index) => {

      return (
        <tr>

        <th scope="row">{index + 1} </th>
        <td> { item.firstName + ' ' + item.lastName } </td>
        <td> { this.displayWorkingCompanies(item) } </td>
        <td> { item.contestsScore } </td>
        <td> { item.GPA }</td>
        <td> { item.faculty + ' ' + item.college } </td>

        </tr>
      );
      })
    }


    {/* <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Mark</td>
      <td>Otto</td>

    </tr> */}
    {/* <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td>Mark</td>
      <td>Otto</td>

    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td>Mark</td>
      <td>Otto</td>

    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td>Mark</td>

      <td>@mdo</td>
    </tr> */}
  </tbody>
</table>
       </>
    );
  }

}

export default HelperFilters;