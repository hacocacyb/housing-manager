import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import * as BedActions from '../data/actions/bed.js'
import BaseGrid from './shared/BaseGrid.js'
import Button from './shared/Button.js'

const colDefs = [
	{headerName: 'Id', field: 'Id',hide: true},
	{headerName: 'Name', field: 'Name'},
	{headerName: 'Type', field: 'Type'},
	{headerName: 'Building Name', field: 'BuildingName'},
	{headerName: 'Occupied', field: 'Occupied', cellStyle: {
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
	}
	componentWillMount() {
		this.props.getAll();
  }
	add() {
		hashHistory.push('beds/edit')
	}

	edit() {
		hashHistory.push('beds/edit/' + this.state.selection.Id);
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
					onRowDoubleClicked={this.edit.bind(this)}
					onSelectionChange={this.onSelectionChange.bind(this)}
					rowData={this.props.data}
					columnDefs={colDefs}
					buttons={toolbar}
				/>

		 );
	}

}

export default connect((store) => {
	return {...store.beds};
}, {
	getAll: BedActions.getAll
})(Bed);
