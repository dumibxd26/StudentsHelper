import React from "react";

import io from 'socket.io-client';

const socket = io.connect("http://localhost:5001");
class HelperFilters extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      displayData: null
    }

    this.handleInitialiseChat = this.handleInitialiseChat.bind(this);
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

  handleInitialiseChat = (helperName) => {
    
    socket.on('connect', () => {
      console.log('Connected to the server');
    });
    
    socket.on('disconnect', function() {
      console.log('Disconnected from server');
    });
    
    socket.emit('join', {
      name: localStorage.getItem('name'), room: helperName,
      message: 'Hello, I am ' + localStorage.getItem('name') + ' and I would like to chat with you.'});
    
    // socket.emit('join', {
    //   name: localStorage.getItem('name'),
    //   room: localStorage.getItem('name') + ' ' + helperName
    // });

    

    localStorage.setItem('currentChat', localStorage.getItem('name') + ' ' + helperName);

    window.location.href = 'http://localhost:3000/chat';
  }



  render() {
    return (
       <>
      <table class="table table-hover table-dark">
  <thead>
    <tr  style={{textAlign:"center"}}>
      <th scope="col">#</th>
      <th scope="col">Name </th>
      <th scope="col">Companies worked at</th>
      <th scope="col">Contests Score </th>
      <th scope="col">GPA </th>
      <th scope="col">Faculty </th>
      <th scope="col">Chat </th>
    </tr>
  </thead>
  <tbody>


    { this.state.displayData && this.state.displayData.map((item, index) => {

      return (
        <tr style={{textAlign:"center"}}>

          <th scope="row">{index + 1} </th>
          <td> { item.firstName + ' ' + item.lastName } </td>
          <td> { this.displayWorkingCompanies(item) } </td>
          <td> { item.contestsScore } </td>
          <td> { item.GPA }</td>
          <td> { item.faculty + ' ' + item.college } </td>
          <td> <button type="button" class="btn btn-light" onClick={(e) => this.handleInitialiseChat(item.firstName + ' ' + item.lastName)}>Initialise Chat</button> </td>

        </tr>
      );
      })
    }

  </tbody>
</table>
       </>
    );
  }

}

export default HelperFilters;