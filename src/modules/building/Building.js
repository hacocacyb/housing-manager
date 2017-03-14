import React from 'react'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'
import * as Actions from '../../data/store.js'
import * as BuildingActions from '../../data/actions/building.js'
import GridPanel from '../../shared/GridPanel.js'
import Button from '../../shared/Button.js'

var colDefs = [
  {
    headerName: 'Id',
    field: 'id',
    width: 40,
    hide: true
  }, {
    headerName: 'Building Name',
    width: 160,
    field: 'name'
  }, {
    headerName: 'Total Beds',
    field: 'bedCount',
    width: 100,
    align: 'right'
  }, {
    headerName: 'Occupied',
    field: 'occupied',
    width: 100,
    align: 'right'
  }, {
    headerName: 'Address 1',
    field: 'addr1',
    width: 140
  }, {
    headerName: 'Address 2',
    field: 'addr2',
    width: 140
  }, {
    headerName: 'City',
    field: 'city',
    width: 140
  }, {
    headerName: 'State',
    field: 'state',
    width: 90
  }, {
    headerName: 'Zip',
    field: 'zip',
    width: 80
  }
]
class Building extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      selection: null
    }
    this.add = this.add.bind(this)
    this.edit = this.edit.bind(this)
		this.onEditClick = this.onEditClick.bind(this)
		this.onDblClick = this.onDblClick.bind(this)
  }
  onSelectionChange(sel) {
    this.setState({selection: sel})
  }
  componentWillMount() {
    Actions.getAllBuildings();
  }
  add() {
    this.props.removeCurrent()
    hashHistory.push('/buildings/edit')
  }
  edit(id) {
    hashHistory.push('buildings/edit/' + id);
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

  render() {
    const toolbar = [
      <Button key="add" onClick={this.add.bind(this)} text="New Building" />,
      <Button key="edit" onClick={this.edit} text="Edit" disabled={this.state.selection ? false : true} />
    ]

    return (<GridPanel
      gridName="buildingGrid"
      title="Buildings"
      loading={this.props.fetching}
      onSelectionChange={this.onSelectionChange.bind(this)}
      onRowDoubleClicked={this.onDblClick}
      rowData={this.props.data}
      columnDefs={colDefs}
      buttons={toolbar}/>);
  }

}

export default connect((store) => {
  return {
    ...store.buildings
  };
}, {
  getAll: Actions.getAll,
  setCurrent: BuildingActions.get,
  removeCurrent: BuildingActions.removeCurrent
})(Building);
