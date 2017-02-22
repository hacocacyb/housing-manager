import React, { Component } from 'react'
import { Router, hashHistory } from 'react-router'
import { connect } from 'react-redux'


import './w3.css'
import 'font-awesome/css/font-awesome.css'

import 'ag-grid/dist/styles/ag-grid.css'
import 'ag-grid/dist/styles/theme-fresh.css'

import 'react-widgets/dist/css/react-widgets.css'

import './App.css'



import store from './data/store'

import * as CodeActions from './data/actions/code'
import * as BuildingActions from './data/actions/building'
import * as BedActions from './data/actions/bed'
import * as PeopleActions from './data/actions/person'
import * as VisitActions from './data/actions/visit'

store.dispatch(CodeActions.getBedTypes());
store.dispatch(BedActions.getAll());
store.dispatch(BuildingActions.getAll());
store.dispatch(PeopleActions.getAll());
store.dispatch(VisitActions.getAll());

import routes from './Routes'


class App extends Component {
  render() {
    return (
      <Router history={hashHistory} routes={routes} />
    );
  }
}
export default connect((store) => {
  return store
})(App);
