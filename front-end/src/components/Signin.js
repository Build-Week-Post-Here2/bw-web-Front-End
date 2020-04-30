import React from 'react';
import LoginForm from './LoginForm';
import Register from './Register';
import './Signin.styles.scss'

const SignIn = () => (
    <div className='sign-in'>
        <LoginForm/>
        <Register/>
    </div>
)

export default SignIn