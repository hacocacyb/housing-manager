import React from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
//import * as Actions from '../data/actions/building.js'
import * as Actions from '../data/store.js'
import BaseGrid from './shared/BaseGrid.js'
import Button from './shared/Button.js'

const colDefs = [
	{headerName: 'Id', field: 'Id', width: 40, hide: true},
	{headerName: 'Name', field: 'Name'},
	{headerName: 'Total Beds', field: 'BedCount', width: 90},
	{headerName: 'Occupied', field: 'Occupied', width: 80},
	{headerName: 'Address 1', field: 'Addr1', width: 140},
	{headerName: 'Address 2', field: 'Addr2', width: 140},
	{headerName: 'City', field: 'City', width: 140},
	{headerName: 'State', field: 'State', width: 90},
	{headerName: 'Zip', field: 'Zip', width: 80}
]
class Building extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			selection: null
		}
	}
	onSelectionChange(sel) {
		this.setState({
			selection: sel
		})
	}
	componentDidMount() {
		Actions.getAllBuildings();
  }
  add() {
		hashHistory.push('/buildings/edit')
	}
	edit() {
		hashHistory.push('buildings/edit/' + this.state.selection.Id);
	}

	render() {
		const toolbar = [

			<Button key="add" onClick={this.add.bind(this)} text="Add Building" />,
			<Button key="edit"
				onClick={this.edit.bind(this)} text="Edit"
 				className={this.state.selection ? '' : "w3-disabled"}
			/>,
			<Button key="refresh" onClick={() => Actions.getAllBuildings(true)} text="Refresh"/>
		]

		return (

				<BaseGrid
					onSelectionChange={this.onSelectionChange.bind(this)}
					onRowDoubleClicked={this.edit.bind(this)}
					rowData={this.props.data}
					columnDefs={colDefs}
					buttons={toolbar}
				/>

		 );
	}

}

export default connect((store) => {
	return {...store.buildings};
}, {
	getAll: Actions.getAll
})(Building);
