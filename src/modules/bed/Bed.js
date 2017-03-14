import React from 'react'
import { connect } from 'react-redux'
import * as BedActions from '../../data/actions/bed'
import GridPanel from '../../shared/GridPanel'
import Button from '../../shared/Button'
import gridPanelWrapper from '../../shared/GridPanelWrapper'

const colDefs = [
	{headerName: 'Id', field: 'id',hide: true},
	{headerName: 'Bed Name', field: 'name', width: 160},
	{headerName: 'Building Name', field: 'buildingName', width: 160},
	{headerName: 'Bed Type', field: 'type', width: 100},
	{headerName: 'Occupied', field: 'occupied', width: 100,
		align: 'center',
		cellRenderer: function(obj) {
			return obj.value ? '<span class="text-success glyphicon glyphicon-ok" />' : ''
		}
	}
]

class Bed extends React.Component {

	render() {
		const toolbar = [
			<Button key="add" onClick={this.props.add}>New Bed</Button>,
			<Button key="edit" onClick={this.props.onEditClick}
				disabled={this.props.selection ? false : true}
				text="Edit"
			/>
		]
		return (
				<GridPanel
					gridName="bedGrid"
					title="Beds"
					loading={this.props.fetching}
					rowData={this.props.data}
					onRowDoubleClicked={this.props.onRowDoubleClicked}
					onSelectionChange={this.props.onSelectionChange}
					columnDefs={this.props.colDefs}
					buttons={toolbar}
				/>
		 );
	}

}
Bed = gridPanelWrapper(Bed, 'beds/edit', BedActions)

export default connect((store) => {
	return {
		...store.beds,
		colDefs: colDefs
	};
})(Bed);
