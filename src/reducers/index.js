import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import LogReducer from './LogReducer'

export default combineReducers({
  auth: AuthReducer,
  log: LogReducer
})
