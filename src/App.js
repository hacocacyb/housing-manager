import React, { Component } from 'react'
import { Router, hashHistory } from 'react-router'
import { connect } from 'react-redux'


import './w3.css'
import './App.css'
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/theme-material.css';

import 'ag-grid/dist/styles/theme-bootstrap.css';
import 'ag-grid/dist/styles/theme-fresh.css';
import 'ag-grid/dist/styles/theme-material.css';

import 'react-widgets/dist/css/react-widgets.css';
import Layout from './modules/Layout.js'
import Beds from './modules/Bed.js'
import BedEdit from './modules/BedEdit.js'
import Rooms from './modules/Room.js'
import Buildings from './modules/Building.js'
import BuildingEdit from './modules/BuildingEdit.js'
import People from './modules/People.js'
import PeopleEdit from './modules/PeopleEdit.js'
import Visit from './modules/Visit.js'
import VisitEdit from './modules/VisitEdit.js'

import store from './data/store.js'

import * as CodeActions from './data/actions/codeActions.js'
import * as BuildingActions from './data/actions/building.js'
import * as BedActions from './data/actions/bedActions.js'
import * as PeopleActions from './data/actions/person.js'

store.dispatch(CodeActions.getBedTypes());
store.dispatch(BedActions.getAll());
store.dispatch(BuildingActions.getAll());
store.dispatch(PeopleActions.getAll());

const routes = {
  path: '/',
  component: Layout,
  indexRoute: {
    onEnter: (nextState, replace) => {
      replace('/beds')
    }
  },
  childRoutes: [{
    path: '/beds',
    component : Beds
  }, {
    path: '/beds/edit(/:Id)',
    component: BedEdit
  }, {
    path: '/rooms',
    component: Rooms
  }, {
    path: '/buildings',
    component: Buildings
  }, {
    path: '/buildings/edit(/:Id)',
    component: BuildingEdit
  }, {
    path: '/people',
    component : People
  }, {
    path: '/people/edit(/:Id)',
    component: PeopleEdit
  }, {
    path: '/visits',
    component : Visit
  }, {
    path: '/visits/edit(/:Id)',
    component: VisitEdit
  }, {
    path: '*',
    indexRoute: {
      onEnter: (nextState, replace) => {
        replace('/beds')
      }
    }
  }]
}

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
