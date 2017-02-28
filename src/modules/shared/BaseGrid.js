import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import withBodyResize from './withBodyResize'

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
    let cols = this.gridOptions.columnApi.getAllColumns().map((c) => c.colId);
    this.gridOptions.columnApi.autoSizeColumns(cols);
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

export default withBodyResize(BaseGrid)
