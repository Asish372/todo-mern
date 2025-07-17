
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

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
      
      // Check if user exists, if not create it
      let user = await User.findOne({ username: 'Asish' });
      if (!user) {
        console.log('Creating demo user');
        const hashedPassword = await bcrypt.hash('Asish@2002', 10);
        user = new User({ 
          username: 'Asish', 
          password: hashedPassword 
        });
        await user.save();
        console.log('Demo user created with ID:', user._id);
      } else {
        console.log('Demo user found with ID:', user._id);
      }
      
      // Create token
      const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
      console.log('Token created:', token);
      return res.json({ token, username: user.username });
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