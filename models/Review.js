const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, default: 'Client' },
  avatar: { type: String, default: '🙂' },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  approved: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);