import React from 'react'
import { connect } from 'react-redux'
import { AgGridReact } from 'ag-grid-react'

const colDefs = [
	{headerName: 'Name', field: 'Name', width: 190},
	{headerName: 'Total Beds', field: 'BedCount', width: 100},
	{headerName: 'Occupied', field: 'Occupied', width: 100}
]
class BuildingWidget extends React.Component {

	render() {

		const data = this.props.data.map(function(d) {
			return (
				<div className="w3-container w3-row">
					<div className="w3-col s6 l6">{d.Name}</div>
					<div className="w3-col s3 l3">{d.BedCount}</div>
					<div className="w3-col s3 l3">{d.Occupied}</div>
				</div>
			)
		})
		return (
      <div className={"w3-card-4 " + this.props.className }>
				<header className="w3-container w3-blue">Buildings</header>
					<div className="w3-container w3-row w3-border-bottom">
						<div className="w3-col s6 l6">Building</div>
						<div className="w3-col s3 l3">Beds</div>
						<div className="w3-col s3 l3">Occupied</div>
					</div>
				{data}
      </div>
		 );
	}

}

export default connect((store) => {
	return {...store.buildings};
})(BuildingWidget);
