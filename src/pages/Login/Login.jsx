import React from 'react';
import LoginForm from '../../components/LoginForm';

const Login = ({navigateToDashboard, navigateToSignup}) => {
    return (
        <div className='TodoWrapper'>
            <h1 className='align-center'>Login</h1>
            <LoginForm navigateToDashboard = {navigateToDashboard} navigateToSignup = {navigateToSignup}/>
        </div>
    )
}

export default Login;