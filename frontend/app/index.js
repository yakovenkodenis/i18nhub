import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Link, Miss } from 'react-router';

import MainLayout from './layouts/main';
import Home from './components/home';
import About from './components/about';


const App = () => (
    <BrowserRouter>
        <MainLayout>

            <hr />

            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about'>About</Link></li>
            </ul>

            <hr />

            <Match exactly pattern='/' component={Home} />
            <Match pattern='/about' component={About} />

            <Miss component={Home} />
        </MainLayout>
    </BrowserRouter>
);

render(<App />, document.querySelector('#root'));
