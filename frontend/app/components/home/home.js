import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Match } from 'react-router';

import ApiTest from '../api-test';
import SignInContainer from '../../containers/signin';


class Home extends Component {
    render() {
        return (
            <div>
                { !this.props.auth.signedIn &&  <Redirect to={{
                    pathname: '/signin',
                    state: { from: this.props.location.pathname }
                }} /> }
                <h2>Home</h2>
                <h3>{JSON.stringify(this.props)}</h3>
                <ApiTest />

                <Match pattern='/signin' component={SignInContainer} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Home);
