import React from 'react'

export default (props) => {
  return (
    <div className="w3-container">
      <header><h3>Sober Living - Web Sandbox</h3></header>
      <section className="w3-margin-bottom">
        This site is a sandbox for experimenting with new (or new to me) technologies.
        Sober Living is a fictional company for managing stays at supervised living
        facilities in the Chicagoland area. All data is fake.
      </section>
      <section>
        Tools and frameworks used to develop the side:
        <ul>
          <li>Node, npm, express, webpack, babel, ES6</li>
          <li>React/Redux, Sequelize, Postgres</li>
          <li>Testing with Jest, Enzyme</li>
          <li>Additional Packages: ag-grid-react, redux-form, react-widgets</li>
          <li>W3.CSS</li>
        </ul>

      </section>
    </div>
  )
}
