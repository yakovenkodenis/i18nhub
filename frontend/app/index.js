import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './config/store';
import reducers from './reducers';

import App from './components/app';


const reduxDevTools =
    process.env.NODE_ENV !== 'production'
    && window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__();

const Application = () => (
    <Provider store={store(reducers, reduxDevTools)}>
        <App />
    </Provider>
);

render(<Application />, document.querySelector('#root'));
