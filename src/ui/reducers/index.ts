import app, { AppState } from './app'
import { combineReducers } from 'redux'

export interface RootState {
  app: AppState
}

const rootReducer = combineReducers({ app })
export default rootReducer
