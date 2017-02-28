import React, {Component} from 'react'
import {Router, hashHistory} from 'react-router'
import {connect} from 'react-redux'

import './w3.css'
import 'font-awesome/css/font-awesome.css'
import 'ag-grid/dist/styles/ag-grid.css'
import 'ag-grid/dist/styles/theme-fresh.css'
import 'react-widgets/dist/css/react-widgets.css'
import './App.css'
import routes from './Routes'
import * as Actions from './data/store'

Actions.initializeData();

class App extends Component {
  render() {
    return (<Router history={hashHistory} routes={routes}/>);
  }
}
export default connect((state) => {
  return state
})(App);
