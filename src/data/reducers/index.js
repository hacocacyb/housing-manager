import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import bedReducer from './bedReducer'
import codeReducer from './codeReducer'
import buildings from './buildings'
import people from './people'
import visits from './visits'

const reducer = combineReducers({
  beds: bedReducer,
  codes: codeReducer,
  form: formReducer,
  buildings: buildings,
  people: people,
  visits: visits
})
export default reducer
