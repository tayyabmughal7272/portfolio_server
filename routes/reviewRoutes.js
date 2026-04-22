const express = require('express');
const router = express.Router();
const { getReviews, submitReview, getAllReviews, approveReview, deleteReview } = require('../controllers/reviewController');
const auth = require('../middleware/auth');

router.get('/', getReviews);
router.post('/', submitReview);
router.get('/all', auth, getAllReviews);
router.put('/:id/approve', auth, approveReview);
router.delete('/:id', auth, deleteReview);

module.exports = router;