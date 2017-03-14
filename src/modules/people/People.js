import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import * as Actions from '../../data/actions/people.js'
import GridPanel from '../../shared/GridPanel.js'
import Button from '../../shared/Button.js'
import gridPanelWrapper from '../../shared/GridPanelWrapper'

const colDefs = [
	{headerName: 'Id', field: 'id',hide: true},
	{headerName: 'First', field: 'first', width: 120},
	{headerName: 'Middle', field: 'middle', width: 120},
	{headerName: 'Last', field: 'last', width: 120},
	{headerName: 'D.O.B.', field: 'dob', width: 120,
		cellFormatter: function(obj) {
			return obj.value ? moment(obj.value).format('MM/DD/YYYY') : null
		}
	},
	{headerName: 'Phone', field: 'phone', width: 140},
	{headerName: 'Visiting', field: 'visiting', width: 60,
		align: 'center',
		cellRenderer: function(obj) {
			return obj.value ? '<span class="text-success glyphicon glyphicon-ok" />' : ''
		}
	}
]
class People extends React.Component {

	render() {
		const buttons = [
			<Button key="add" onClick={this.props.add} text="New Visitor" />,
			<Button key="edit" onClick={this.props.onEditClick} text="Edit"
				disabled={this.props.selection ? false : true}/>
		]
		return (
		  <GridPanel
				gridName="peopleGrid"
				title="Visitors"
				loading={this.props.fetching}
				onRowDoubleClicked={this.props.onRowDoubleClicked}
				onSelectionChange={this.props.onSelectionChange}
				rowData={this.props.data}
				columnDefs={colDefs}
				buttons={buttons}
			/>
		 );
	}
}
People = gridPanelWrapper(People, 'people/edit', Actions)

export default connect((store) => {
	return {...store.people};
}, {
	getAll: Actions.getAll
})(People);
