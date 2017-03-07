import React from 'react'
import ReduxGrid from './ReduxGrid'
import withBodyResize from './withBodyResize'
import { ButtonToolbar } from 'react-bootstrap'

import 'ag-grid/dist/styles/ag-grid.css'
import 'ag-grid/dist/styles/theme-bootstrap.css'

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

  render() {
    const props = this.props;
    let style = {
      height: props.height || 400
    }
    return (
      <div className="w3-padding-small w3-padding-top">
        <ButtonToolbar>
          {props.buttons}
        </ButtonToolbar>
        <div className="ag-bootstrap" style={style}>
          <ReduxGrid
            onRowSelected={this.onRowSelected.bind(this)}
            enableColResize={true}
            enableSorting={true}
            rowSelection={'single'}
            {...props}
          />
        </div>
      </div>
    )
  }

}

export default withBodyResize(GridPanel);
