import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Match } from 'react-router';

import MainLayout from '../../layouts/main';
import Home from '../home';

import Dashboard from '../../containers/dashboard';
import SignInContainer from '../../containers/signin';

import I18NHubAPI from '../../api';
import { isSignedIn } from '../../actions';


class App extends Component {

    constructor(props, context) {
        super(props, context);

        this.I18NHubAPI = new I18NHubAPI();

        this.state = {
            redirectToLogin: false
        }
    }

    componentWillMount() {
        this.I18NHubAPI.auth
            .verifyJWT(this.props.auth.jwt)
            .then(response => {
                if (response.data.token) {
                    console.log('SUCCESSFUL VERIFICATION');
                    this.setState({ redirectToLogin: true });
                }
            });
    }

    render() {
        return (
            <BrowserRouter>
                <MainLayout>
                    {
                        this.props.auth.redirectToLogin
                        && <Redirect to={{
                                pathname: '/signin',
                                state: { from: this.props.location.state.pathname }
                            }} />
                    }
                    <Match exactly pattern='/' component={Home} />
                    <Match pattern='/signin' component={SignInContainer} />
                </MainLayout>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { isSignedIn }
)(App);
