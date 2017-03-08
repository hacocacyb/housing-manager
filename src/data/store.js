import { applyMiddleware, createStore } from 'redux'

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import reducer from "./reducers/index.js"
import * as CodeActions from './actions/code'
import * as BuildingActions from './actions/building'
import * as BedActions from './actions/bed'
import * as PeopleActions from './actions/people'
import * as VisitActions from './actions/visit'

let mw = [promise(), thunk]
if (false && process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
  mw.push(logger())
}
const middleware = applyMiddleware(...mw)
var store = createStore(reducer, middleware)

export default store


//helper functions

//good for local cacheing IF all actions which could influence it
//force an update. Adding in the bed count and visit count means that
// this needs an update eaech time those change. <ToDo?>
export function getAllBuildings(byForce) {
  // const state = store.getState();
  // if (!byForce && state.buildings.data.length > 0) {
  //   return state.buildings.data;
  // } else {
    store.dispatch(BuildingActions.getAll());
  // }
}

//dont make more of these without building hash tables first
export function getVisitById(id) {
  const state = store.getState();
  const visits = state.visits.data;
  let visit;
  let ix = 0;
  while (!visit  && ix < (visits.length)) {
    if (visits[ix].id === id) {
      visit = visits[ix];
    }
    ix++;
  }
  return visit;
}

export function initializeData() {
  store.dispatch(CodeActions.getBedTypes());
  store.dispatch(BedActions.getAll());
  store.dispatch(BuildingActions.getAll());
  store.dispatch(PeopleActions.getAll());
  store.dispatch(VisitActions.getAll());
}
