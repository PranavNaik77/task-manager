import React, { useContext, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import TodoWrapper from './components/TodoWrapper';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Singnup';
import { AuthContext } from './context/AuthContext';

function App() {

  const [isLoggedin, setIsLoggedin] = useState(false);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    login();
  },[user])

  const login = () => {
    if(user){
      setIsLoggedin(true);
      navigate('/dashboard');
    }
    else{
      setIsLoggedin(false);
      navigateToLogin()
    }
  }

  const navigateToLogin = () => {
    navigate('/login');
  }

  const navigateToDashboard = () => {
    login();
  }

  const navigateToSignup = () => {
    navigate('/signup');
  }

  return (
    <>
      <Routes>
        <Route exact path='/login' element={<Login navigateToDashboard = {navigateToDashboard} navigateToSignup = {navigateToSignup}/>}/>
        <Route exact path='/signup' element={<Signup navigateToLogin = {navigateToLogin}/>} />
        <Route exact path='/dashboard' element={<TodoWrapper />} />
      </Routes>
    </>
  );
}

export default App;
