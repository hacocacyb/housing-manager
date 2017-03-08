import React from 'react'
import { Panel } from 'react-bootstrap'
export default (props) => {
  const header = <h3>Sober Living - Web Sandbox</h3>
  return (
    <div className="container">
      <Panel header={header}>
        This site is a sandbox for experimenting with new (or new to me) technologies.
        Rental Manager is an application for managing stays at a group of supervised living
        facilities. The setup is similar to a hotel or a single bed rental.
      </Panel>
      <Panel>
        Tools and frameworks used to develop the site:
        <ul>
          <li>Node, npm, express, webpack, babel, ES6</li>
          <li>React/Redux, Sequelize, Postgres</li>
          <li>ag-grid-react, react-bootstrap, redux-form</li>
          <li>Testing with Jest, Enzyme</li>
          <li>Deployment with heroku</li>
          <li>Bootstrap CSS</li>
        </ul>

      </Panel>
    </div>
  )
}
