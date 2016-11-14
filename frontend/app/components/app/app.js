import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Match, Link, Miss } from 'react-router';

import MainLayout from '../../layouts/main';
import Home from '../home';
import About from '../about';
import MatchWhenAuthorized from '../../containers/match-when-authorized';

import ApiTest from '../api-test';

import { isSignedIn } from '../../actions';


const App = (props) => (
    <BrowserRouter>
        {({ router }) => (
            <MainLayout>
                {props.auth.signedIn ? (
                    <p>
                        Welcome! {' '}
                        <button onClick={() => router.transitionTo('/')}>Sign out</button>
                    </p>
                ) : (
                  <p>You are not logged in.</p>
                )}

                <hr />
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                </ul>
                <hr />

                <ApiTest />

                <Match exactly pattern='/' component={Home} />
                <Match pattern='/about' component={About} />
                {/* <MatchWhenAuthorized component={} /> */}
                <Miss component={Home} />
            </MainLayout>
        )}
    </BrowserRouter>
);

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { isSignedIn }
)(App);
