import React from 'react'
import { Panel } from 'react-bootstrap'
export default (props) => {
  const header = <h3>Sober Living - Web Sandbox</h3>
  return (
    <div className="container">
      <Panel header={header}>
        This site is a sandbox for experimenting with new (or new to me) technologies.
        Sober Living is a fictional company for managing stays at supervised living
        facilities in the Chicagoland area.
      </Panel>
      <Panel>
        Tools and frameworks used to develop the site:
        <ul>
          <li>Node, npm, express, webpack, babel, ES6</li>
          <li>React/Redux, Sequelize, Postgres</li>
          <li>Testing with Jest, Enzyme</li>
          <li>Deployment with heroku</li>
          <li>Additional Packages: ag-grid-react, react-bootstrap, redux-form, react-widgets</li>
          <li>Bootstrap CSS</li>
        </ul>

      </Panel>
    </div>
  )
}
