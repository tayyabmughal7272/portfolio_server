// server/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const connectDB = require('./config/db');
const corsOptions = require('./config/cors');

connectDB();

const app = express();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes - Clean & Simple
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/certificates', require('./routes/certificateRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

app.use((err, req, res, next) => {
  console.error(err);

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }

  if (err && err.http_code === 403 && err.name === 'UnexpectedResponse') {
    return res.status(500).json({
      message:
        'Cloudinary upload forbidden (403). Check Cloudinary API key permissions or account upload restrictions.'
    });
  }

  if (err && err.message) {
    return res.status(500).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});