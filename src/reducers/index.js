import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import LogReducer from './LogReducer'
import ChartReducer from './ChartReducer'

export default combineReducers({
  auth: AuthReducer,
  log: LogReducer,
  chart: ChartReducer
})
