import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Match } from 'react-router';


const MatchWhenAuthorized = ({ auth, component: Component, ...rest }) => (
    <Match {...rest} render={props => (
        auth.signedIn ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
              pathname: '/login',
             state: { from: props.location }
            }}/>
        )
    )}/>
)

export default connect(
    (state) => ({ auth: state.auth })
)(MatchWhenAuthorized);
