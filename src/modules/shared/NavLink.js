import React from 'react'
import { Link } from 'react-router'
import './NavLink.css'

export default (props) => {
  return (
    <Link
      className="hasThisClass"
      activeClassName={'active-nav-link'}
      {...props}
    >
      {props.children}
    </Link>
  )
}
