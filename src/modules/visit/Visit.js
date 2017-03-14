import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import * as Actions from '../../data/actions/visit.js'
import GridPanel from '../../shared/GridPanel.js'
import Button from '../../shared/Button.js'
import moment from 'moment'
import gridPanelWrapper from '../../shared/GridPanelWrapper'

const dateCellFormatter = function(obj) {
	if (obj.value) {
		return moment(obj.value).format('MM/DD/YYYY');
	}
}
const rentalPeriod = function(obj) {
	if (obj.value) {
		return obj.value === 1 ? 'Weekly' : 'Bi-Weekly'
	}
}
let colDefs = [
	{headerName: 'Visitor', cellRenderer: function(obj) {
		const data = obj.node.data;
		const fullName = data.first + (data.middle ? ' ' + data.middle + ' ' : ' ') + data.last;
		return fullName;
	}, colId: 'visitor'},
	{headerName: 'Building', field: 'buildingName', width: 160},
	{headerName: 'Bed', field: 'bedName', width: 120},
	{headerName: 'Rental Period', field: 'rentalPeriodId', cellFormatter: rentalPeriod, width: 160},
	{headerName: 'Intake', field: 'intake', cellFormatter: dateCellFormatter, width: 120},
	{headerName: 'Outtake', field: 'outtake', cellFormatter: dateCellFormatter, width: 120},
	{headerName: 'Rent', field: 'cost', width: 100}
]
class Visit extends React.Component {

	addPayment() {
		const id = this.props.selection ? this.props.selection.id : '';
		if (id) {
			hashHistory.push('/payment/' + id)
		}
	}

	render() {
		const buttons = [
			<Button key="add" onClick={this.props.add} text="New Visit" />,
			<Button key="viewPayment" onClick={this.addPayment.bind(this)}
				disabled={this.props.selection ? false : true}>View Payments</Button>,
			<Button key="edit" onClick={this.props.onEditClick} text="Edit"
				disabled={this.props.selection ? false : true}/>
		]
		return (
		  <GridPanel
				gridName={"visitGrid"}
				title="Visits"
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

Visit = gridPanelWrapper(Visit, 'visits/edit', Actions)
export default connect((store) => {
	return {...store.visits};
})(Visit);
