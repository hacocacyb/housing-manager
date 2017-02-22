import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import bed from './bed'
import code from './code'
import buildings from './buildings'
import people from './people'
import visits from './visits'

const reducer = combineReducers({
  beds: bed,
  codes: code,
  form: formReducer,
  buildings: buildings,
  people: people,
  visits: visits
})
export default reducer
