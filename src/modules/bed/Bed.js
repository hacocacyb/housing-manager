import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import * as BedActions from '../../data/actions/bed'
import GridPanel from '../../shared/GridPanel.js'
import Button from '../../shared/Button.js'

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
	constructor(props) {
		super(props)
		this.state = {
			selection: null
		}
		this.edit = this.edit.bind(this)
		this.onEditClick = this.onEditClick.bind(this)
		this.onDblClick = this.onDblClick.bind(this)
	}
	componentWillMount() {
		this.props.getAll();
  }
	add() {
		hashHistory.push('beds/edit')
	}

	edit(id) {
		hashHistory.push('beds/edit/' + id);
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
		const toolbar = [
			<Button key="add" onClick={this.add}>New Bed</Button>,
			<Button key="edit" onClick={this.edit}
				disabled={this.state.selection ? false : true}
				text="Edit"
			/>
		]
		return (
				<GridPanel
					gridName="bedGrid"
					title="Beds"
					loading={this.props.fetching}
					onRowDoubleClicked={this.onDblClick}
					onSelectionChange={this.onSelectionChange.bind(this)}
					rowData={this.props.data}
					columnDefs={this.props.colDefs}
					buttons={toolbar}
				/>
		 );
	}

}

export default connect((store) => {
	return {
		...store.beds,
		colDefs: colDefs
	};
}, {
	getAll: BedActions.getAll,
	removeCurrent: BedActions.removeCurrent
})(Bed);
