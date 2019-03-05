import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers'

const initialState = {}
const middlewares = [
  thunk,
]

let enhancedComposer = compose;
if (process.env.NODE_ENV !== 'production') {
  enhancedComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  middlewares.push(logger);
}

const composedEnhancers = enhancedComposer(
  applyMiddleware(...middlewares),
)

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
)

export default store;
