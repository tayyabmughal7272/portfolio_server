const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// @desc    Admin Login
// @route   POST /api/admin/login
const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, admin: { id: admin._id, email: admin.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Setup admin (POST)
const setupAdmin = async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (existingAdmin) {
      return res.json({ message: 'Admin already exists', email: existingAdmin.email });
    }
    
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    });
    await admin.save();
    
    res.json({ message: 'Admin created successfully!', email: admin.email });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Setup admin via GET (temporary for browser)
const setupAdminGet = async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (existingAdmin) {
      return res.json({ message: 'Admin already exists', email: existingAdmin.email });
    }
    
    const admin = new Admin({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD
    });
    await admin.save();
    
    res.json({ message: 'Admin created successfully!', email: admin.email });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { login, setupAdmin, setupAdminGet };