const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDesc: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // image URL
  icon: { type: String },
  tech: [{ type: String }],
  category: { type: String, enum: ['ai', 'ecommerce', 'fullstack', 'frontend', 'backend'] },
  color: { type: String },
  github: { type: String },
  live: { type: String },
  features: [{ type: String }],
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);