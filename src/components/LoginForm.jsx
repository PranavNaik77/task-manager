import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';


const LoginForm = ({navigateToDashboard, navigateToSignup}) => {

    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined
    });
    const[err, setErr] = useState();

    const {loading, dispatch} = useContext(AuthContext);

    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
        if(!credentials.username || !credentials.password) return;
        try {
            const result = await axios.post("/auth/login", credentials)
            dispatch({type: "LOGIN_SUCCESS", payload: result.data.details});
            navigateToDashboard();
        }
        catch(error) {
            dispatch({type: "LOGIN_FAILURE", payload: error.response.data});
            setErr(error.response.data);
        }
    }

    return (
        <div>
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
                <div className='align-left'>
                    <button disabled={loading} type='sumbit' className='login-btn'>Submit</button>
                </div>
            </form>
            <div className='align-left'>
                <button type='button' className='login-btn' onClick={navigateToSignup}>Not a user?, Sign up</button>
            </div>
        </div>
    )
}

export default LoginForm;