import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Redirect } from 'react-router';

import { signIn } from '../../actions';


class SignInContainer extends Component {
    constructor(props, context) {
        super(props, context);

        state = {
            redirectToReferrer: false
        }
    }

    onSubmit({ username, password }) {
        this.props.signIn(username, password)
            .then(() => this.setState({ redirectToReferrer: true }));
    }

    addDangerClassToInput({ touched, invalid }) {
        return touched && invalid ? 'has-danger' : '';
    }

    render() {
        const {
            fields: { username, password }, handleSubmit
        } = this.props;

        const { from } = this.props.location.state || '/'
        const { redirectToReferrer } = this.state

        return (
            {redirectToReferrer && (
                <Redirect to={from || '/'}/>
            )}
            {from && (<form onSubmit={handleSubmit(::this.onSubmit)} className='signin-form'>
                <h3>Sign In</h3>
                <div className={`form-group ${this.addDangerClassToInput(username)}`}>
                    <label>Username</label>
                    <input type='text' className='form-control' {...username} />
                    <div className='text-help'>
                        {username.touched && username.error ? username.error : ''}
                    </div>
                </div>
                <div className={`form-group ${this.addDangerClassToInput(password)}`}>
                    <label>Password</label>
                    <input type='password' className='form-control' {...password} />
                    <div className='text-help'>
                        {password.touched && password.error ? password.error : ''}
                    </div>
                </div>
                <button type='submit' className='btn btn-primary pad-5'>
                    Sign In
                </button>
            </form>
            )}
        );
    }
}

const validate = ({ username, password }) => {
    let errors = {}

    if (!username) {
        errors.username = 'Enter username';
    }

    if (!password) {
        errors.password = 'Enter password';
    }

    return errors;
}

export default reduxForm({
    form: 'SignInForm',
    fields: ['username', 'password'],
    validate
}, null, { signIn })(SignInContainer);
