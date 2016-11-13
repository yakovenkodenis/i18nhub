import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Match, Link, Miss } from 'react-router';

import MainLayout from './layouts/main';
import Home from './components/home';
import About from './components/about';

import ApiTest from './components/api-test';

import store from './config/store';
import reducers from './reducers';


const reduxDevTools =
    process.env.NODE_ENV !== 'production'
    && window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__();

const App = () => (
    <Provider store={store(reducers, reduxDevTools)}>
        <BrowserRouter>
            <MainLayout>
                <hr />
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                </ul>
                <hr />

                <ApiTest />

                <Match exactly pattern='/' component={Home} />
                <Match pattern='/about' component={About} />
                <Miss component={Home} />
            </MainLayout>
        </BrowserRouter>
    </Provider>
);

render(<App />, document.querySelector('#root'));
