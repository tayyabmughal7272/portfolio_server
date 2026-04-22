const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

// Send email helper (optional - agar credentials nahi hain to skip)
const sendEmail = async (name, email, message) => {
  // Check if email credentials exist
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('Email credentials not configured. Skipping email notification.');
    return;
  }
  
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.log('Email error:', error.message);
    // Don't throw error - message should still save
  }
};

// @desc    Submit contact form
// @route   POST /api/contact
const submitContact = async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    // Save to database
    const contact = new Contact({ name, email, message });
    await contact.save();
    
    // Try to send email (optional, won't break if fails)
    await sendEmail(name, email, message);
    
    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// @desc    Get all messages (Admin only)
const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Mark message as read (Admin only)
const markAsRead = async (req, res) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { read: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete message (Admin only)
const deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { submitContact, getMessages, markAsRead, deleteMessage };