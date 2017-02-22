import React from 'react'
import BuildingWidget from './BuildingWidget'

class Dashboard extends React.Component {


  render() {
    return (
      <div className="w3-container w3-padding-large">
        <div className="w3-row">
          <BuildingWidget className="w3-third" height="300"/>
        </div>
      </div>
    )
  }
}

export default Dashboard;
