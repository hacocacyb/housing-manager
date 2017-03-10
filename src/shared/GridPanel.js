import React from 'react'
import ReduxGrid from './ReduxGrid'
import withBodyResize from './withBodyResize'
import { ButtonToolbar } from 'react-bootstrap'
import './GridPanel.css'

class GridPanel extends React.Component {

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
  applyColumnDefaults(columns) {
    return columns.map(function(col) {
      if (col.align) {
        let className;
        if (col.align === 'right') {
          className = ' align-right'
        } else if (col.align === 'center') {
          className = ' align-center'
        }
        col.cellClass += className;
        col.headerClass += className;
      }
      return col;
    })
  }
  render() {
    const props = this.props;
    let style = {
      height: props.height || 400
    }
    const columnDefs = this.applyColumnDefaults(props.columnDefs);
    return (
      <div className="fluid-container grid-panel">
        <header className="card-title">{props.title}</header>
        <ButtonToolbar className="grid-panel-toolbar">
          {props.buttons}
        </ButtonToolbar>
        <div className="ag-material grid-panel-body" style={style}>
          <ReduxGrid
            rowHeight={48}
            onRowSelected={this.onRowSelected.bind(this)}
            enableColResize={true}
            enableSorting={true}
            rowSelection={'single'}
            columnDefs={columnDefs}
            {...props}
          />
        </div>
      </div>
    )
  }

}

export default withBodyResize(GridPanel);
