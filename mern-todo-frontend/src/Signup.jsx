import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);
  const navigate = useNavigate();

  const { username, password, confirmPassword } = formData;

  // Trigger animation after component mounts
  useEffect(() => {
    setTimeout(() => setAnimateForm(true), 100);
  }, []);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validate passwords match
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    // Validate password strength
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    
    setLoading(true);
    
    try {
      // API URL based on environment
      const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:5000/api/auth/signup'
        : '/api/auth/signup';
      
      await axios.post(apiUrl, { username, password });
      
      setSuccess('Account created successfully! Redirecting to login...');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${animateForm ? 'animate' : ''}`}>
        <div className="auth-logo">
          <div className="logo-icon">✎</div>
        </div>
        <h2>Create Account</h2>
        <p className="auth-subtitle">Sign up to get started</p>
        
        <form onSubmit={onSubmit}>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <div className="form-group">
            <div className="input-icon-wrapper">
              <i className="input-icon">👤</i>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={onChange}
                placeholder="Choose a username"
                required
                autoFocus
                className="input-with-icon"
              />
            </div>
          </div>
          
          <div className="form-group">
            <div className="input-icon-wrapper">
              <i className="input-icon">🔒</i>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Create a password"
                required
                className="input-with-icon"
              />
            </div>
          </div>
          
          <div className="form-group">
            <div className="input-icon-wrapper">
              <i className="input-icon">✔</i>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                placeholder="Confirm your password"
                required
                className="input-with-icon"
              />
            </div>
          </div>
          
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <span className="loading-spinner-button"></span>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>
        
        <p className="auth-redirect">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;