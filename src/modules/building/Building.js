import React from 'react'
import {connect} from 'react-redux'
import * as BuildingActions from '../../data/actions/building.js'
import GridPanel from '../../shared/GridPanel.js'
import Button from '../../shared/Button.js'
import gridPanelWrapper from '../../shared/GridPanelWrapper'

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

  render() {
    const toolbar = [
      <Button key="add" onClick={this.props.add} text="New Building" />,
      <Button key="edit"
        onClick={this.props.onEditClick}
        text="Edit"
        disabled={this.props.selection ? false : true} />
    ]

    return (
      <GridPanel
        gridName="buildingGrid"
        title="Buildings"
        loading={this.props.fetching}
        onRowDoubleClicked={this.props.onRowDoubleClicked}
        onSelectionChange={this.props.onSelectionChange}
        rowData={this.props.data}
        columnDefs={colDefs}
        buttons={toolbar}
      />
    );
  }

}
Building = gridPanelWrapper(Building, 'buildings/edit', BuildingActions)

export default connect((store) => {
  return {
    ...store.buildings
  };
})(Building);
