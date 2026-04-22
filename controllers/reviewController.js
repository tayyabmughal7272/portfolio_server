const Review = require('../models/Review');

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const submitReview = async (req, res) => {
  const { name, role, rating, text } = req.body;
  
  try {
    const review = new Review({ name, role, rating, text });
    await review.save();
    res.json({ success: true, message: 'Review submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const approveReview = async (req, res) => {
  try {
    await Review.findByIdAndUpdate(req.params.id, { approved: true });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getReviews, submitReview, getAllReviews, approveReview, deleteReview };