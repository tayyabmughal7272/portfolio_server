const express = require('express');
const router = express.Router();
const { 
  getCertificates, 
  getCertificateById, 
  createCertificate, 
  updateCertificate, 
  deleteCertificate 
} = require('../controllers/certificateController');
const auth = require('../middleware/auth');
const { uploadCertificate } = require('../middleware/cloudinaryUpload');

// Public routes
router.get('/', getCertificates);
router.get('/:id', getCertificateById);

// Admin routes (with auth)
router.post('/', auth, uploadCertificate.single('image'), createCertificate);
router.put('/:id', auth, uploadCertificate.single('image'), updateCertificate);
router.delete('/:id', auth, deleteCertificate);

module.exports = router;