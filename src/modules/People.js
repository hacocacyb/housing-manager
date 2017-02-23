import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import * as Actions from '../data/actions/person.js'
import BaseGrid from './shared/BaseGrid.js'
import Button from './shared/Button.js'

const colDefs = [
	{headerName: 'Id', field: 'Id', width: 40, hide: true},
	{headerName: 'First Name', field: 'First'},
	{headerName: 'Middle', field: 'Middle', width: 90},
	{headerName: 'Last Name', field: 'Last', width: 80},
	{headerName: 'Phone', field: 'Phone', width: 140},
	{headerName: 'Visiting', field: 'Visiting', cellStyle: {
			textAlign: 'center'
		}, cellFormatter: function(obj) {
		return obj.value ? 'Y' : ''
	}}
]
class People extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			selection : null
		};
	}

	componentWillMount() {
		this.props.getAll();
  }

	add() {
		hashHistory.push('/people/edit')
	}

	edit() {
		hashHistory.push('people/edit/' + this.state.selection.Id);
	}

	onSelectionChange(sel) {
		this.setState({
			selection: sel
		})
	}

	render() {
		const buttons = [
			<Button key="add" onClick={this.add.bind(this)} text="Add Visitor" />,
			<Button key="edit" onClick={this.edit.bind(this)} text="Edit" className={this.state.selection ? '' : "w3-disabled"}/>,
			<Button key="refresh" onClick={this.props.getAll} text="Refresh"/>
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
	return {...store.people};
}, {
	getAll: Actions.getAll
})(People);
