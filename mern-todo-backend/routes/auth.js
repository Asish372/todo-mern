const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register a new user
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    const user = new User({ username, password });
    await user.save();
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Demo login for the assignment
    if (username === 'Asish' && password === 'Asish@2002') {
      // Find or create demo user
      let user = await User.findOne({ username: 'Asish' });
      
      if (!user) {
        user = new User({ username: 'Asish', password: 'Asish@2002' });
        await user.save();
      }
      
      // Generate token
      const token = jwt.sign(
        { userId: user._id }, 
        process.env.JWT_SECRET || 'secretkey', 
        { expiresIn: '24h' }
      );
      
      return res.json({ 
        token, 
        user: { 
          id: user._id, 
          username: user.username 
        } 
      });
    }
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'secretkey', 
      { expiresIn: '24h' }
    );
    
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username 
      } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user
router.get('/me', async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No authentication token' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;