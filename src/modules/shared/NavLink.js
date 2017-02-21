import React from 'react'
import { Link } from 'react-router'

const activeLinkStyle = { backgroundColor: 'white', color: 'black', fontWeight: 'bolder' }

export default (props) => {

  return (
    <Link
      activeStyle={activeLinkStyle}
      {...props}
    >
      {props.children}
    </Link>
  )
}
