import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';


class NavbarComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('currentChat');
    localStorage.removeItem('data');
    window.location.reload();
  }

  render() {
    return (
      <>
        <Navbar key={'xl'} bg="light" expand={'xl'} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="http://localhost:3000">Students Helper</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${'xl'}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${'xl'}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${'xl'}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${'xl'}`}>
                  {/* Offcanvas */}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">

                  { this.props.userType === "student" &&
                    <>
                      {
                      window.location.href !== "http://localhost:3000/findMatch" ?
                      <Nav.Link href="http://localhost:3000/findMatch">Find Matches</Nav.Link> :
                      <Nav.Link disabled >Find Matches</Nav.Link>
                      }
                    </>
                  }

                  {
                    window.location.href !== "http://localhost:3000/chat" ?
                    <Nav.Link href="http://localhost:3000/chat">Chat</Nav.Link> :
                    <Nav.Link disabled >Chat</Nav.Link>
                  }
                  
                  {
                    window.location.href !== "http://localhost:3000/about/me" ?
                    <Nav.Link href="http://localhost:3000/about/me">About</Nav.Link> :
                    <Nav.Link disabled >About</Nav.Link>
                  }
                  
                  { this.props.userType === "student" &&
                    <>
                      {
                      window.location.href !== "http://localhost:3000/solve" ?
                      <Nav.Link href="http://localhost:3000/solve">Solve Random Test</Nav.Link> :
                      <Nav.Link disabled >Solve Random Test</Nav.Link>
                      }
                    </>
                  }

                  <Nav.Link href="http://localhost:3000" onClick={this.handleLogout}>Logout</Nav.Link>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    
      </>
      );
  }

}

export default NavbarComponent;