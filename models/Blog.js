// server/models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  category: { type: String, enum: ['tech', 'tutorial', 'career'], default: 'tech' },
  tags: [{ type: String }],
  readTime: { type: String, default: '5 min read' },
  featured: { type: Boolean, default: false },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);