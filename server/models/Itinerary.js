const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true, // Optional: Improves query performance for user-specific itineraries
  },
  title: {
    type: String,
    required: true, // Kept as required, defaulted in the route
  },
  destination: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return this.startDate <= value; // Ensure endDate is not before startDate
      },
      message: 'endDate must be greater than or equal to startDate',
    },
  },
  interests: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    default: 0,
    min: 0, // Optional: Ensures budget is non-negative
  },
  travelers: {
    type: Number,
    default: 1,
    min: 1, // Optional: Ensures at least one traveler
  },
  days: [{
    date: {
      type: Date,
      required: true,
    },
    activity: {
      type: String,
      required: true,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Optional: Add an index for better performance on date-based queries
itinerarySchema.index({ startDate: 1, endDate: 1 });

module.exports = mongoose.model('Itinerary', itinerarySchema);