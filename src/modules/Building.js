import React from 'react'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'
import * as Actions from '../data/store.js'
import BaseGrid from './shared/BaseGrid.js'
import Button from './shared/Button.js'

var colDefs = [
  {
    headerName: 'Id',
    field: 'id',
    width: 40,
    hide: true
  }, {
    headerName: 'Name',
    field: 'name'
  }, {
    headerName: 'Total Beds',
    field: 'bedCount',
    width: 90,
    cellStyle: {
      textAlign: 'right'
    }
  }, {
    headerName: 'Occupied',
    field: 'occupied',
    width: 80,
    cellStyle: {
      textAlign: 'right'
    }
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
  }
  onSelectionChange(sel) {
    this.setState({selection: sel})
  }
  componentDidMount() {
    Actions.getAllBuildings();
  }
  add() {
    hashHistory.push('/buildings/edit')
  }
  edit() {
    hashHistory.push('buildings/edit/' + this.state.selection.id);
  }

  render() {
    const selectedClass = this.state.selection ? '' : 'w3-disabled'
    const toolbar = [
      <Button key="add" onClick={this.add.bind(this)} text="Add Building" />,
      <Button key="edit" onClick={this.edit.bind(this)} text="Edit" className={selectedClass} />,
      <Button key="refresh" onClick={()=> Actions.getAllBuildings(true)} text="Refresh" />
    ]

    return (<BaseGrid
      gridName={"buildingGrid"}
      onSelectionChange={this.onSelectionChange.bind(this)}
      onRowDoubleClicked={this.edit.bind(this)}
      rowData={this.props.data}
      columnDefs={colDefs}
      buttons={toolbar}/>);
  }

}

export default connect((store) => {
  return {
    ...store.buildings
  };
}, {getAll: Actions.getAll})(Building);
