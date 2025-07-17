import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // ALWAYS use these hardcoded credentials
    const fixedUsername = 'Asish';
    const fixedPassword = 'Asish@2002';
    
    try {
      console.log('Attempting login with hardcoded credentials');
      
      // Use relative URL in production, absolute in development
      const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:5000/api/auth/login'
        : '/api/auth/login';
      
      const res = await axios.post(apiUrl, { 
        username: fixedUsername, 
        password: fixedPassword 
      });
      
      console.log('Login successful:', res.data);
      setToken(res.data.token);
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid credentials - Please try again');
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit}>
        <h2>Welcome Back</h2>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            required 
            autoFocus
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn-primary">
          {error ? 'Try Again' : 'Login'}
        </button>
        {error && <div className="error-message">{error}</div>}
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}