const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6'; // Use your secure key (move to .env)

// Signup
router.post('/signup', async (req, res) => {
  const { username, email, password, passwordHint } = req.body;
  try {
    console.log('Signup request:', { username, email, password, passwordHint });
    if (!username || !email || !password || !passwordHint) {
      return res.status(400).json({ message: 'All fields (username, email, password, passwordHint) are required.' });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists.' });
    }

    // Store password as plain text (no hashing)
    const user = new User({ username, email, password, passwordHint });
    await user.save();
    console.log('User saved:', user.email);

    const token = jwt.sign({ userId: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Signup failed. Please try again.' });
  }
});

// Login (Email only)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Login request:', { email, password });
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    console.log('Found user:', user.email);

    // Compare passwords as plain text
    const isMatch = password === user.password;
    console.log('Password match:', isMatch);
    if (!isMatch) {
      console.log('Password mismatch for email:', email);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    console.log('Login successful for email:', email);
    res.json({ token });
  } catch (error) {
    console.error('Server error during login:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;