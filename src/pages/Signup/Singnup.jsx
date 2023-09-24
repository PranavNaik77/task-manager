import React from "react";
import SignupForm from "../../components/SignupForm";

const Signup = ({navigateToLogin}) => {
    return (
        <div className='TodoWrapper'>
            <h1 className='align-center'>Signup</h1>
            <SignupForm navigateToLogin = {navigateToLogin}/>
        </div>
    )
}

export default Signup;