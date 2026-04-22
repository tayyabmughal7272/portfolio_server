const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  org: { type: String, required: true },
  year: { type: String, required: true },
  icon: { type: String, default: '🎓' },
  color: { type: String, default: '#00ffff' },
  image: { type: String },  // Cloudinary URL
  link: { type: String },   // Verification link
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certificate', certificateSchema);