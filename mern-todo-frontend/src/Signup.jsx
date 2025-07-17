import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { username, password });
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-form">
      <form onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Choose a username" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            required 
            autoFocus
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            placeholder="Create a password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn-primary">
          {error ? 'Try Again' : 'Create Account'}
        </button>
        {error && <div className="error-message">{error}</div>}
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}