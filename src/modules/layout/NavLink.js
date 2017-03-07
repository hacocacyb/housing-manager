import React from 'react'
import {Link} from 'react-router'

export default React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  render: function() {
    const isActive = this.context.router.isActive(this.props.to, true);
    const className = isActive ? "active" : "";

    return (
      <li className={className}>
        <Link {...this.props}>
          {this.props.children}
        </Link>
      </li>
    )
  }
})
