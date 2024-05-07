import React, { useState } from 'react';
import { signUp, login } from './auth'; // Adjust path based on your structure

const AuthComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      signUp(email, password);
    } else {
      login(email, password);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
      <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
        Switch to {isSignUp ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
};

export default AuthComponent;
