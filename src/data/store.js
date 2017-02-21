import { applyMiddleware, createStore } from 'redux'

import logger from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"
import reducer from "./reducers/index.js"
import * as BuildingActions from "./actions/building.js"


const middleware = applyMiddleware(promise(), thunk) //, logger()
var store = createStore(reducer, middleware)

export default store


//helper functions

//good for local cacheing IF all actions which could influence it
//force an update. Adding in the bed count and visit count means that
// this needs an update eaech time those change. <ToDo?>
export function getAllBuildings(byForce) {
  const state = store.getState();
  // if (!byForce && state.buildings.data.length > 0) {
  //   return state.buildings.data;
  // } else {
    store.dispatch(BuildingActions.getAll());
  // }
}
