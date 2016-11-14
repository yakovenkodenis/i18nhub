import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import renderField from '../../components/render-field';
import { signIn } from '../../actions/auth-actions';


class SignInContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            redirectToReferrer: false
        }
    }

    onSubmit({ username, password }) {
        console.log('onSubmit!!!', this.props)
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

        const { from } = this.props.location.state || '/';
        const { redirectToReferrer } = this.state;

        return (
            <div>
                { redirectToReferrer && <Redirect to={from || '/'}/> }
                { from && (<form onSubmit={handleSubmit(::this.onSubmit)} className='signin-form'>
                    <h3>Sign In</h3>
                    <Field
                        name='username'
                        component={renderField}
                        type='text'
                        label='Username'
                        classFunc={this.addDangerClassToInput} />
                    <Field
                        name='password'
                        component={renderField}
                        type='password'
                        label='Password'
                        classFunc={this.addDangerClassToInput} />
                    <button type='submit' className='btn btn-primary pad-5'>
                        Sign In
                    </button>
                </form>
                )}
            </div>
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

SignInContainer = reduxForm({
    form: 'SignInForm',
    fields: ['username', 'password'],
    validate
})(SignInContainer);

export default connect(
    null,
    { signIn }
)(SignInContainer);
