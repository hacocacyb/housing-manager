import React from 'react'
import { hashHistory } from 'react-router'
import {connect} from 'react-redux'

function gridPanelWrapper(WrappedComponent, apiRoot, Actions) {
  class Wrapper extends React.Component {
    constructor(props) {
  		super(props)
      this.state = {
  			selection: null
  		}
      this.add = this.add.bind(this)
  		this.edit = this.edit.bind(this)
  		this.onEditClick = this.onEditClick.bind(this)
  		this.onDblClick = this.onDblClick.bind(this)
      this.onSelectionChange = this.onSelectionChange.bind(this)
  	}

    render() {
      return <WrappedComponent
        {...this.props}
        selection={this.state.selection}
        add={this.add}
        onEditClick={this.onEditClick}
        onRowDoubleClicked={this.onDblClick}
        onSelectionChange={this.onSelectionChange}

      />
    }

    componentWillMount() {
  		this.props.getAll();
    }
  	add() {
  		hashHistory.push(apiRoot)
  	}

  	edit(id) {
  		hashHistory.push(apiRoot + '/' + id);
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

  	onSelectionChange(sel) {
  		this.setState({
  			selection: sel
  		})
  	}
  }

  return connect(null, {
    getAll: Actions.getAll
  })(Wrapper)

}
export default gridPanelWrapper;
