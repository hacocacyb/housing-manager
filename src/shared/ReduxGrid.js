import React from 'react'
import { AgGridReact } from 'ag-grid-react'
import { connect } from 'react-redux'

function ReduxGrid(WrappedComponent) {

  class ReduxWrapper extends React.Component {
    constructor(props) {
      super(props)

      this.persistColState = this.persistColState.bind(this);
    }

    onGridReady(options) {
      const props = this.props;

      this.gridOptions = options;
      const api = options.api;

      if (props.gridState) {
        const { columnState, sortState, filterState } = props.gridState;

        if (columnState) {
          options.columnApi.setColumnState(columnState)
        }
        if (sortState) {
          api.setSortModel(sortState)
        }
        if (filterState) {
          api.setFilterModel(filterState)
        }
      }

      const events = [
        'columnResized', 'sortChanged', 'filterChanged', 'columnRowGroupChanged',
        'gridColumnsChanged', 'displayedColumnsChanged', 'floatingRowDataChanged'
      ];
      events.forEach((eventName) => {
        api.addEventListener(eventName, this.persistColState)
      })

      //call super onGridReady
      if (props.onGridReady) {
        props.onGridReady(options)
      }
    }

    persistColState() {
      const opt = this.gridOptions;
      const gridState = {
        columnState: opt.columnApi.getColumnState(),
        sortState: opt.api.getSortModel(),
        filterState: opt.api.getFilterModel()
      }

      //dispatch the raw action object so
      //the only manual include is the reducer
      this.props.dispatch({
        type: "UPDATE_GRID_STATE",
        payload: {
          gridName: this.props.gridName,
          gridState: gridState
        }
      })
    }

    render() {
      const props = this.props;

      return <WrappedComponent
        {...props}
        onGridReady={this.onGridReady.bind(this)}
      />
    }
  }

  //gridName property is required to use as id for reducer
  ReduxWrapper.propTypes = {
    gridName: React.PropTypes.string.isRequired
  }

  function mapStateToProps(store, ownProps) {
    const gridState = store.grid[ownProps.gridName];

    return {
      gridState: gridState
    }
  }

  return connect(mapStateToProps)(ReduxWrapper)
}

export default ReduxGrid(AgGridReact);
