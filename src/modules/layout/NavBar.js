import React from 'react'
import NavLink from './NavLink.js'
import { Navbar, Nav } from 'react-bootstrap';
export default (props) => {
  return (
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          Sober Living
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/visits">Visits</NavLink>
          <NavLink to="/payment">Payments</NavLink>
          <NavLink to="/people">Visitors</NavLink>
          <NavLink to="/buildings">Buildings</NavLink>
          <NavLink to="/beds">Beds</NavLink>
          <NavLink to="/about">About</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>



  )
}

    // <nav className="navbar navbar-default">
    //   <div className="container-fluid">
    //     <div className="navbar-header">
    //       <a className="navbar-brand" href="#/about">Sober Living</a>
    //     </div>
    //     <ul className="nav navbar-nav">
    //       <NavLink to="/dashboard">Dashboard</NavLink>
    //       <NavLink to="/visits">Visits</NavLink>
    //       <NavLink to="/payment">Payments</NavLink>
    //       <NavLink to="/people">Visitors</NavLink>
    //       <NavLink to="/buildings">Buildings</NavLink>
    //       <NavLink to="/beds">Beds</NavLink>
    //       <NavLink to="/about">About</NavLink>
    //     </ul>
    //   </div>
    // </nav>
    //
