import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'

class BuildingWidget extends React.Component {

	render() {
		const data = this.props.data.map((d) => d);
		data.sort(function(a, b) {
			return b.occupied - a.occupied;
		})
		const rows = data.map(function(d) {
			return (
				<div key={"widget-row-" + d.name} className="w3-row w3-border-top">
					<div className="w3-col s6 l6">{d.name}</div>
					<div className="w3-col s3 l3 w3-center">{d.bedCount}</div>
					<div className="w3-col s3 l3 w3-center">{d.occupied}</div>
				</div>
			)
		})
		return (
      <div className={"w3-card-4 " + this.props.className } onDoubleClick={()=>hashHistory.push('/buildings')}>
				<header className="w3-container w3-blue">Buildings</header>
				<div className="w3-container">
					<div className="w3-row w3-border-bottom">
						<div className="w3-col s6 l6">Building</div>
						<div className="w3-col s3 l3 w3-center">Beds</div>
						<div className="w3-col s3 l3 w3-center">Occupied</div>
					</div>
					{rows}
				</div>
      </div>
		 );
	}
}

export default connect((store) => {
	return {...store.buildings};
})(BuildingWidget);
