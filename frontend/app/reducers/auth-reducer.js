import { Auth } from '../config/constants';


const INITIAL_STATE = {
    jwt: '',
    signedIn: false,
    error: null
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Auth.SIGN_IN:
            return { jwt: action.payload.token, signedIn: true }
        case Auth.SIGN_IN_FAIL:
            return { ...state, signedIn: false, error: action.payload.error }
        case Auth.SIGN_UP:
            return { ...state, signedIn: false };
        case Auth.SIGN_UP_FAIL:
            return { ...state, signedIn: false, error: action.payload.error }
        case Auth.SIGN_OUT:
            return { ...state, jwt: null, signedIn: false }
        case Auth.VERIFY_SIGNED_IN:
            return { ...state, jwt: action.payload.jwt, signedIn: true }
        case Auth.VERIFY_SIGNED_IN_ERROR:
            return { ...state, signedIn: false }
        default:
            return state;
    }
}
