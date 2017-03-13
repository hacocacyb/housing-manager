import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import moment from 'moment'
import * as Actions from '../../data/actions/people.js'
import GridPanel from '../../shared/GridPanel.js'
import Button from '../../shared/Button.js'

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

	constructor(props) {
		super(props)
		this.state = {
			selection : null
		};
		this.edit = this.edit.bind(this)
		this.onEditClick = this.onEditClick.bind(this)
		this.onDblClick = this.onDblClick.bind(this)
	}

	componentWillMount() {
		this.props.getAll();
  }

	add() {
		hashHistory.push('/people/edit')
	}

	edit(id) {
		hashHistory.push('people/edit/' + id);
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
		console.log('selection change so setting the state to new selection')
		this.setState({
			selection: sel
		})
	}

	render() {
		const buttons = [
			<Button key="add" onClick={this.add.bind(this)} text="New Visitor" />,
			<Button key="edit" onClick={this.onEditClick} text="Edit"
				disabled={this.state.selection ? false : true}/>
		]
		return (
		  <GridPanel
				gridName="peopleGrid"
				title="Visitors"
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
	return {...store.people};
}, {
	getAll: Actions.getAll
})(People);
