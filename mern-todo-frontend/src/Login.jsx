import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setToken }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [animateForm, setAnimateForm] = useState(false);
  const navigate = useNavigate();

  const { username, password } = formData;

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
    setLoading(true);
    
    try {
      // API URL based on environment
      const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:5000/api/auth/login'
        : '/api/auth/login';
      
      const res = await axios.post(apiUrl, { username, password });
      
      // Set token in localStorage and state
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setToken(res.data.token);
      
      // Redirect to dashboard
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      
      // For demo purposes, if using demo credentials but server is down
      if (username === 'Asish' && password === 'Asish@2002') {
        const demoToken = 'demo-token-' + Date.now();
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify({ username: 'Asish' }));
        setToken(demoToken);
        navigate('/');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${animateForm ? 'animate' : ''}`}>
        <div className="auth-logo">
          <div className="logo-icon">✓</div>
        </div>
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Please login to continue</p>
        
        <form onSubmit={onSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <div className="input-icon-wrapper">
              <i className="input-icon">👤</i>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={onChange}
                placeholder="Username"
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
                placeholder="Password"
                required
                className="input-with-icon"
              />
            </div>
          </div>
          
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <span className="loading-spinner-button"></span>
            ) : (
              'Login'
            )}
          </button>
        </form>
        
        <p className="auth-redirect">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;