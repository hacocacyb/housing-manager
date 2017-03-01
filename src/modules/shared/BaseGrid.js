import React from 'react'
import { connect } from 'react-redux'
import { AgGridReact } from 'ag-grid-react'
import withBodyResize from './withBodyResize'

import { setGridState } from '../../data/actions/grid'

class BaseGrid extends React.Component {

  onRowSelected(rec) {
    if (typeof this.props.onSelectionChange === 'function') {
      if (rec) {
        let data = rec.node.data;
        if (data) {
          this.props.onSelectionChange(data);
          return;
        }
      }
      this.props.onSelectionChange();
    }

  }
  componentDidUpdate() {
    this.autoSizeColumns();
  }

  autoSizeColumns() {
    //let cols = this.gridOptions.columnApi.getAllColumns().map((c) => c.colId);
    //this.gridOptions.columnApi.autoSizeColumns(cols);
  }


  persistColState() {
    const opt = this.gridOptions;
    const gridState = {
      colState: opt.columnApi.getColumnState(),
      sortModel: opt.api.getSortModel(),
      filterModel: opt.api.getFilterModel()
    }

    this.props.setGridState(this.props.gridName, gridState);
  }

  render() {
    const props = this.props;
    let style = {
      height: props.height || 400
    }
    return (
      <div className="w3-padding-small w3-padding-top">
        <div  className="w3-bar" style={{marginBottom:8}}>
          {props.buttons}
        </div>
        <div className="ag-fresh" style={style}>
          <AgGridReact
            onRowSelected={this.onRowSelected.bind(this)}
            enableColResize={true}
            enableSorting={true}
            rowSelection={'single'}
            onColumnResized={this.persistColState.bind(this)}
            onSortChanged={this.persistColState.bind(this)}
            onGridReady={(options) => {
              this.gridOptions = options;
              this.autoSizeColumns()
            }}
            {...props}
          />
        </div>
      </div>
    )
  }

}

export default connect((store, ownProps) => {
  const columnDefs = ownProps.columnDefs;
  const gridState =  store.grid[ownProps.gridName];

  if (gridState) {
    let sorts = {}
    gridState.sortModel.forEach((sort) => {
      const sortCol = sort.colId;
      const sortDir = sort.sort;
      sorts[sortCol] = sortDir
    })
    let widths = {}
    gridState.colState.forEach((col) => {
      widths[col.colId] = col.width
    })
    columnDefs.forEach((col) => {
      col.sort = sorts[col.field]
      col.width = widths[col.field]
    })
  }

  return {
    columnDefs: columnDefs
  }
}, {
  setGridState: setGridState
})(withBodyResize(BaseGrid));
