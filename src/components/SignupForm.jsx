import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import axios from 'axios';

const SignupForm = ({navigateToLogin}) => {

    const [credentials, setCredentials] = useState({
        username: undefined,
        email: undefined,
        password: undefined
    })
    const [err, setErr] = useState();

    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!credentials.username || !credentials.password) return;
        try {
            const result = await axios.post("/auth/register", credentials);
            console.log(result.data);
            navigateToLogin();
        }
        catch(error){
            setErr(err)
            console.log(error);
        }
    }

    return (
        <form className='LoginForm' onSubmit={handleSubmit}>
            <div>
                <input type='text' className='todo-input' placeholder='Enter Username' id='username' onChange={handleChange}></input>
                {!credentials.username && (
                    <div className='error-message'>
                        Please enter a username
                    </div>
                )}
            </div>
            <div>
                <input type='email' className='todo-input' placeholder='Enter Email' id='email' onChange={handleChange}></input>
                {!credentials.email && (
                    <div className='error-message'>
                        Please enter your email
                    </div>
                )}
            </div>
            <div>
                <input type='password' className='todo-input' placeholder='Enter Password' id='password' onChange={handleChange}></input>
                {!credentials.password && (
                    <div className='error-message'>
                        Please enter a password
                    </div>
                )}
                {err && (
                    <div className='error-message'>
                        {err.message}
                    </div>
                )}
            </div>
            <div className='align-center'>
                <button type='sumbit' className='login-btn'>Signup</button>
            </div>
        </form>
    )
}

export default SignupForm;