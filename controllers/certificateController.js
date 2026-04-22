// server/controllers/certificateController.js
const Certificate = require('../models/Certificate');
const deleteFromCloudinary = require('../utils/deleteimage');

// @desc    Get all certificates
// @route   GET /api/certificates
const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ year: -1 });
    res.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single certificate by ID
// @route   GET /api/certificates/:id
const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    res.json(certificate);
  } catch (error) {
    console.error('Error fetching certificate:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create certificate
// @route   POST /api/certificates
const createCertificate = async (req, res) => {
  try {
    const certData = JSON.parse(req.body.data);
    
    // Add image URL from Cloudinary
    if (req.file) {
      certData.image = req.file.path;
    }
    
    const certificate = new Certificate(certData);
    await certificate.save();
    
    res.json({ success: true, certificate });
  } catch (error) {
    console.error('Error creating certificate:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update certificate
// @route   PUT /api/certificates/:id
const updateCertificate = async (req, res) => {
  try {
    const certData = JSON.parse(req.body.data);
    const existingCert = await Certificate.findById(req.params.id);
    
    if (!existingCert) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    // If new image uploaded, delete old from Cloudinary
    if (req.file) {
      if (existingCert.image) {
        await deleteFromCloudinary(existingCert.image);
      }
      certData.image = req.file.path;
    }
    
    const certificate = await Certificate.findByIdAndUpdate(req.params.id, certData, { new: true });
    res.json({ success: true, certificate });
  } catch (error) {
    console.error('Error updating certificate:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete certificate
// @route   DELETE /api/certificates/:id
const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    
    if (!certificate) {
      return res.status(404).json({ message: 'Certificate not found' });
    }
    
    // Delete image from Cloudinary
    if (certificate.image) {
      await deleteFromCloudinary(certificate.image);
    }
    
    await Certificate.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting certificate:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
  getCertificates, 
  getCertificateById, 
  createCertificate, 
  updateCertificate, 
  deleteCertificate 
};