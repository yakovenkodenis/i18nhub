import { Auth } from '../config/constants';

import I18NHubAPI from '../api';


export const signInWithJWT = token => ({
    type: Auth.SIGN_IN,
    payload: {
        token
    }
});

export const signInError = error => ({
    type: Auth.SIGN_IN_FAIL,
    payload: {
        error
    }
});

export const signUpSync = () => ({
    type: Auth.SIGN_UP
});

export const signUpError = error => ({
    type: Auth.SIGN_UP_FAIL,
    payload: {
        error
    }
});

export const signOut = ({
    type: Auth.SIGN_OUT
});

export const verifySignedIn = jwt => ({
    type: Auth.VERIFY_SIGNED_IN,
    payload: {
        jwt
    }
});

export const verifySignedInError = error => ({
    type: Auth.VERIFY_SIGNED_IN_ERROR,
    payload: {
        error
    }
});

export const signIn = (username, password) => dispatch => {
    I18NHubAPI.auth
        .getJWT(username, password)
        .then(response => {
            dispatch(signInWithJWT(response.data.token))
        })
        .catch(e => {
            dispatch(signInError(e))
        });
}

export const signUp = (
        email, username, first_name, last_name, password
    ) => dispatch => {
    I18NHubAPI.auth
        .signup(email, username, first_name, last_name, password)
        .then(response => {
            dispatch(signUpSync())
        })
        .catch(e => {
            dispatch(signUpError(e))
        });
}

export const isSignedIn = jwt => dispatch => {
    I18NHubAPI.auth
        .verifyJWT(jwt)
        .then(response => {
            if (response.data.token) {
                dispatch(verifySignedIn(response.data.token))
            } else {
                dispatch(verifySignedInError(response.data))
            }
        })
        .catch(e => {
            dispatch(verifySignedInError(e))
        });
}
