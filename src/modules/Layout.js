import React from 'react';
import NavLink from './shared/NavLink.js'



class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navOpen: true
    }
  }
  w3_toggle() {
    this.setState({
      navOpen: !this.state.navOpen
    })
  }
  w3_close() {
    this.setState({
      navOpen: false
    })
  }

  render() {

    let navStyle={
      width: '120px',
      display: this.state.navOpen ? 'block' : 'none'
    }
    let bodyStyle={
      marginLeft: this.state.navOpen ? '120px' : '0px'
    }
    return (
      <div>
        <div className="w3-container w3-padding-small w3-safety-blue App-Header w3-xlarge">
            <span className="w3-opennav"
              onClick={this.w3_toggle.bind(this)}>&#9776;</span>
            Sober Living
        </div>
        <nav  className="w3-sidenav w3-safety-blue hm-side-nav" style={navStyle}>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/visits">Visits</NavLink>
          <NavLink to="/payment">Payments</NavLink>
          <NavLink to="/people">Visitors</NavLink>
          <NavLink to="/buildings">Buildings</NavLink>
          <NavLink to="/beds">Beds</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>

        <div className="Content-Body" style={bodyStyle}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout
