import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import * as Actions from '../../data/actions/visit.js'
import GridPanel from '../../shared/GridPanel.js'
import Button from '../../shared/Button.js'
import moment from 'moment'

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

	constructor(props) {
		super(props)
		this.state = {
			columnDefs: colDefs,
			selection : null
		}
    this.edit = this.edit.bind(this)
		this.onEditClick = this.onEditClick.bind(this)
		this.onDblClick = this.onDblClick.bind(this)

	}

	componentWillMount() {
		this.props.getAll();
  }

	add() {
		hashHistory.push('/visits/edit')
	}

	addPayment() {
		const id = this.state.selection ? this.state.selection.id : '';
		hashHistory.push('/payment/' + id)
	}

	edit() {
		hashHistory.push('visits/edit/' + this.state.selection.id);
	}
	onDblClick(node) {
		if (node && node.data) {
			this.edit(node.data.id)
		}
	}
	onEditClick() {
		if ( this.state.selection &&  this.state.selection.id) {
			this.edit(this.state.selection.id)
		}
	}

	onSelectionChange(sel) {
		this.setState({
			selection: sel
		})
	}

	render() {
		const buttons = [
			<Button key="add" onClick={this.add.bind(this)} text="New Visit" />,
			<Button key="viewPayment" onClick={this.addPayment.bind(this)}
				disabled={this.state.selection ? false : true}>View Payments</Button>,
			<Button key="edit" onClick={this.edit} text="Edit"
				disabled={this.state.selection ? false : true}/>
		]
		return (
		  <GridPanel
				gridName={"visitGrid"}
				title="Visits"
				loading={this.props.fetching}
				onSelectionChange={this.onSelectionChange.bind(this)}
				onRowDoubleClicked={this.onDblClick}
				rowData={this.props.data}
				columnDefs={colDefs}
				buttons={buttons}
			/>
		 );
	}
}

export default connect((store) => {
	return {...store.visits};
}, {
	getAll: Actions.getAll
})(Visit);
