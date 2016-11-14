import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Match, Link } from 'react-router';

import Dashboard from '../../containers/dashboard';
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
                {
                    this.props.auth.signedIn ? (
                        <Dashboard />
                    ) : (
                        <div>
                            <h3>Welcome to I18NHub</h3>
                            <p>
                                You're not signed in. To sign in please click {' '}
                                <Link to='/signin'>here</Link>
                            </p>
                        </div>
                    )
                }

                <Match pattern='/signin' component={SignInContainer} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Home);
