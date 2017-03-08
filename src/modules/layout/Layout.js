import React from 'react'
import NavBar from './NavBar'

class Layout extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="content-body">
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Layout
