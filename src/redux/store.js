import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

// redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// redux store
const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
