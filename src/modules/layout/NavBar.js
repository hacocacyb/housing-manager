import React from 'react'
import NavLink from './NavLink.js'
import { Navbar, Nav } from 'react-bootstrap';
class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.toggleNav = this.toggleNav.bind(this)
    this.onNavClicked = this.onNavClicked.bind(this)
    this.state = {
      navExpanded: false
    }
  }
  onNavClicked() {
    if (this.state.navExpanded) {
      this.toggleNav()
      this.forceUpdate()
    }
  }

  toggleNav() {
    this.setState({
      navExpanded: !this.state.navExpanded
    })
  }
  render() {
    return (
      <Navbar
        fixedTop
        expanded={this.state.navExpanded}
        onToggle={() => this.toggleNav()}
      >
        <Navbar.Header>
          <Navbar.Brand>
            Sober Living
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavLink onClick={this.onNavClicked} to="/dashboard">Dashboard</NavLink>
            <NavLink onClick={this.onNavClicked} to="/visits">Visits</NavLink>
            <NavLink onClick={this.onNavClicked} to="/payment">Payments</NavLink>
            <NavLink onClick={this.onNavClicked} to="/people">Visitors</NavLink>
            <NavLink onClick={this.onNavClicked} to="/buildings">Buildings</NavLink>
            <NavLink onClick={this.onNavClicked} to="/beds">Beds</NavLink>
            <NavLink onClick={this.onNavClicked} to="/about">About</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavBar
