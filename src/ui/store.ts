import { applyMiddleware, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import rootReducer, { RootState } from './reducers'

let middleware = [thunk]

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require('redux-logger')
  const logger = createLogger({
    collapsed: true,
  })
  middleware = [...middleware, logger]
}
const store: Store<RootState> = createStore(
  rootReducer,
  applyMiddleware(...middleware),
)

export default store
