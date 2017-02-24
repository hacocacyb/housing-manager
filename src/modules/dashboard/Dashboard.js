import React from 'react'
import BuildingWidget from './BuildingWidget'
import BedWidget from './BedWidget'
import BillingWidget from './BillingWidget'

class Dashboard extends React.Component {


  render() {
    return (
      <div className="w3-padding-small">
        <div className="w3-row">
          <div className="w3-third w3-padding">
            <BuildingWidget/>
          </div>
          <div className="w3-third w3-padding">
            <BedWidget/>
          </div>
          <div className="w3-third w3-padding">
            <BillingWidget/>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard;