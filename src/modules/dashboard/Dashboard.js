import React from 'react'
import BuildingWidget from './BuildingWidget'
import BedWidget from './BedWidget'
import BillingWidget from './BillingWidget'

class Dashboard extends React.Component {


  render() {
    return (
      <div className="w3-padding-small">
        <div className="w3-row">
          <BuildingWidget className="w3-quarter w3-margin"/>
          <BedWidget className="w3-quarter w3-margin"/>
        </div>
        <div className="w3-row">
          <BillingWidget className="w3-half w3-margin"/>
        </div>
      </div>
    )
  }
}

export default Dashboard;
