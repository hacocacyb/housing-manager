import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import bed from './bed'
import code from './code'
import buildings from './buildings'
import people from './people'
import visits from './visits'
import payments from './payment'

//tracking state of ag-grids
import grid from './grid'

const reducer = combineReducers({
  beds: bed,
  codes: code,
  form: formReducer,
  buildings: buildings,
  payments: payments,
  people: people,
  visits: visits,
  grid: grid
})
export default reducer
