import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Service/firebase';
import { GoEye } from 'react-icons/go';
import { GoEyeClosed } from "react-icons/go";

function Login() {
  const [err, setErr] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formcontainer">
      <div className="formwrapper">
        <span className="logo">Yu Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <div className="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
            <button
              className='passwordbutton'
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
             {showPassword ? <GoEye color='black'  /> : <GoEyeClosed color="black" /> }  
            </button>
          </div>
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>{' '}
        </p>
      </div>
    </div>
  );
}

export default Login;
