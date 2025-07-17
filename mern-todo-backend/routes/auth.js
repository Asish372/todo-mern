
const express = require('express');
const jwt = require('jsonwebtoken');

// Mock User model
const User = {
  findOne: () => Promise.resolve(null),
  save: () => Promise.resolve({})
};

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Just return success for demo
    console.log('Demo signup for:', username);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log('Login attempt for username:', username, 'password:', password);
    
    // HARDCODED LOGIN FOR DEMO
    if (username === 'Asish' && password === 'Asish@2002') {
      console.log('Demo credentials match!');
      
      // Create token without database
      const token = jwt.sign({ userId: 'demo-user-id' }, 'secretkey', { expiresIn: '1h' });
      console.log('Token created:', token);
      return res.json({ token, username: 'Asish' });
    }
    
    // If not using demo credentials, return error
    console.log('Not using demo credentials');
    return res.status(400).json({ message: 'Please use the demo credentials: Asish / Asish@2002' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;