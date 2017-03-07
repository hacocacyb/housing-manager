import React, {Component} from 'react'
import {Router, hashHistory} from 'react-router'
import {connect} from 'react-redux'
import routes from './Routes'
import * as Actions from './data/store'

import 'bootstrap/dist/css/bootstrap.css';

import 'font-awesome/css/font-awesome.css'
import 'react-widgets/dist/css/react-widgets.css'
import './App.css'


Actions.initializeData();

export class App extends Component {
  render() {
    return (<Router history={hashHistory} routes={routes}/>);
  }
}
export default connect((state) => {
  return state
})(App);
