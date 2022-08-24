import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

export default function createStoreInstance(preloadedState = {}) {
  return createStore(reducer, preloadedState, applyMiddleware(thunk))
}
