import React, { useRef } from 'react';
import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const emailRef = useRef(''); // Reference for email input 
  const passwordRef = useRef(''); // Reference for password input

  // Handles the submission for the credentials
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value; // Gets the email from input reference
    const password = passwordRef.current.value; // Gets the password from input reference
    try {
      await signInWithEmailAndPassword(auth, email, password); // Firebase authentication
    } catch (error) {
      console.error("Authentication Error: ", error);
    }
  };

  return (
    <div class= "login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" ref={emailRef} placeholder="Email" required />
        <input type="password" ref={passwordRef} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
