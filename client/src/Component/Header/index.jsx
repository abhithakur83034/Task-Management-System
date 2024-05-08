import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const index = () => {
  return (
    <div>
    <Navbar expand="lg" >
    <Container fluid className="px-5">
      <Navbar.Brand as={Link} to="/">
        <h1>TODO</h1>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav"  className='justify-content-end'>
        <Nav>
          <Nav.Link as={Link} to="/management" className='hoverEffect' style={{ color: '#101010', fontWeight: 'bold' }}>
            Create
          </Nav.Link>
        
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
    </div>
  )
}

export default index
