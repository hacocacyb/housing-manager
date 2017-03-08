import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  render: function() {
    const isActive = this.context.router.isActive(this.props.to, true);
    const className = isActive ? "active" : "";
    let props = {...this.props}
    return (
      <li className={className}>
        <Link to={props.to} onClick={this.props.onClick}>
          {this.props.children}
        </Link>
      </li>
    )
  }
})
