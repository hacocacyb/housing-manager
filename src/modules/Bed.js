import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import * as BedActions from '../data/actions/bed'
import BaseGrid from './shared/BaseGrid.js'
import Button from './shared/Button.js'

const colDefs = [
	{headerName: 'Id', field: 'id',hide: true},
	{headerName: 'Name', field: 'name'},
	{headerName: 'Type', field: 'type'},
	{headerName: 'Building Name', field: 'buildingName'},
	{headerName: 'Occupied', field: 'occupied', cellStyle: {
			textAlign: 'center'
		}, cellFormatter: function(obj) {
		return obj.value ? 'Y' : ''
	}}
]

class Bed extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selection: null
		}
		//default columns on first entry
		// could be in the reducer but that would be confusing IMO

	}
	componentWillMount() {
		this.props.getAll();
  }
	add() {
		hashHistory.push('beds/edit')
	}

	edit() {
		hashHistory.push('beds/edit/' + this.state.selection.id);
	}

	onSelectionChange(sel) {
		this.setState({
			selection: sel
		})
	}

	render() {
		const toolbar = [
			<Button key="add" onClick={this.add}>Add Bed</Button>,
			<Button key="edit" onClick={this.edit.bind(this)}
				text="Edit" className={this.state.selection ? '' : "w3-disabled"}
			/>,
			<Button key="refresh" onClick={this.props.getAll}>Refresh</Button>
		]
		return (

				<BaseGrid
					gridName={"bedGrid"}
					onRowDoubleClicked={this.edit.bind(this)}
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
	getAll: BedActions.getAll
})(Bed);
