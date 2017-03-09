import React from 'react'
import ReduxGrid from './ReduxGrid'
import withBodyResize from './withBodyResize'
import { ButtonToolbar } from 'react-bootstrap'

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
            {...props}
          />
        </div>
      </div>
    )
  }

}

export default withBodyResize(GridPanel);
