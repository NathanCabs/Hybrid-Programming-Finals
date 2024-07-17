import React, { useRef } from 'react';
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const emailRef = useRef(''); // Email Ref
  const passwordRef = useRef(''); // Password Ref

  // Submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value; // Get email
    const password = passwordRef.current.value; // Get password
    try {
      await createUserWithEmailAndPassword(auth, email, password); // Firebase creation of user
    } catch (error) {
      console.error("Authentication Error: ", error);
    }
  };

  return (
    <div class="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" ref={emailRef} placeholder="Email" required />
        <input type="password" ref={passwordRef} placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
