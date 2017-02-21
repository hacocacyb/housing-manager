import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import * as Actions from '../data/actions/visit.js'
import BaseGrid from './shared/BaseGrid.js'
import Button from './shared/Button.js'
import moment from 'moment'

const dateCellFormatter = function(obj) {
	if (obj.value) {
		return moment(obj.value).format('MM/DD/YYYY');
	}
}
let colDefs = [
	{headerName: 'Visitor', cellFormatter: function(obj) {
		const data = obj.node.data;
		return data.First + ' ' + data.Last;
	}},
	{headerName: 'Building', field: 'BuildingName'},
	{headerName: 'Bed', field: 'BedName'},
	{headerName: 'Rental Period', field: 'PayTypeId'},
	{headerName: 'Intake', field: 'Intake', cellFormatter: dateCellFormatter},
	{headerName: 'Outtake', field: 'Outtake', cellFormatter: dateCellFormatter},
	{headerName: 'Rent', field: 'Cost'}
]
class Visit extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			columnDefs: colDefs,
			selection : null
		};

	}

	componentWillMount() {
		this.props.getAll();
  }

	add() {
		hashHistory.push('/visits/edit')
	}

	edit() {
		hashHistory.push('visits/edit/' + this.state.selection.Id);
	}

	onSelectionChange(sel) {
		console.log(sel)
		this.setState({
			selection: sel
		})
	}

	render() {
		const buttons = [
			<Button key="add" onClick={this.add.bind(this)} text="Add Visit" />,
			<Button key="addVisitor" onClick={()=>hashHistory.push('people/edit')}>Add Visitor</Button>,
			<Button key="refresh" onClick={this.props.getAll} text="Refresh"/>,
			<Button key="edit" onClick={this.edit.bind(this)} text="Edit" className={this.state.selection ? '' : "w3-disabled"}/>
		]
		return (
		  <BaseGrid
				onSelectionChange={this.onSelectionChange.bind(this)}
				onRowDoubleClicked={this.edit.bind(this)}
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
