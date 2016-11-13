import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';


let middlewares = [
    thunk
];

if (process.NODE_ENV !== 'production') {
    const createLogger = require('redux-logger');
    const logger = createLogger();
    middlewares = [...middlewares, logger];
}

export const store = applyMiddleware(
    ...middlewares
)(createStore);

export default store;
