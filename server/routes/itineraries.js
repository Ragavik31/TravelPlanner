const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Itinerary = require('../models/Itinerary');
const { ObjectId } = require('mongoose').Types;

const SECRET_KEY = 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6'; // Move to .env in production

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided.' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId; // Attach userId to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// Generate and store a new itinerary
router.post('/generate', authenticate, async (req, res) => {
  const { destination, startDate, endDate, interests, budget, travelers } = req.body;
  try {
    console.log('Itinerary request body:', req.body);
    if (!destination || !startDate || !endDate || !interests || typeof destination !== 'string' || typeof interests !== 'string') {
      return res.status(400).json({ message: 'All required fields must be provided and valid.' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format for startDate or endDate.' });
    }

    if (!ObjectId.isValid(req.userId)) {
      return res.status(400).json({ message: 'Invalid userId.' });
    }

    const itinerary = new Itinerary({
      userId: req.userId,
      title: `Trip to ${destination}`, // Default title
      destination,
      startDate: start,
      endDate: end,
      interests,
      budget: budget || 0,
      travelers: travelers || 1,
      days: [], // Initialize as empty array
      createdAt: new Date(),
    });

    await itinerary.save();
    res.status(201).json({ message: 'Itinerary created successfully', itinerary });
  } catch (error) {
    console.error('Error creating itinerary:', error);
    res.status(500).json({ message: 'Server error while creating itinerary.' });
  }
});

// Get all itineraries for the authenticated user
router.get('/', authenticate, async (req, res) => {
  try {
    const itineraries = await Itinerary.find({ userId: req.userId })
      .select('title destination startDate endDate budget travelers') // Select only needed fields
      .sort({ createdAt: -1 });
    res.json(itineraries);
  } catch (error) {
    console.error('Error fetching itineraries:', error);
    res.status(500).json({ message: 'Server error while fetching itineraries.' });
  }
});

module.exports = router;