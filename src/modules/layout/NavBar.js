import React from 'react'
import NavLink from './NavLink.js'

export default (props) => {
  return (
    <nav  className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="#/about">Sober Living</a>
        </div>
        <ul className="nav navbar-nav">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/visits">Visits</NavLink>
          <NavLink to="/payment">Payments</NavLink>
          <NavLink to="/people">Visitors</NavLink>
          <NavLink to="/buildings">Buildings</NavLink>
          <NavLink to="/beds">Beds</NavLink>
          <NavLink to="/about">About</NavLink>
        </ul>
      </div>
    </nav>

  )
}
