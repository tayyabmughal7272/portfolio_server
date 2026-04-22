// server/utils/deleteImage.js
const { cloudinary } = require('../middleware/cloudinaryUpload');

const deleteFromCloudinary = async (imageUrl) => {
  try {
    if (!imageUrl) return;

    // Extract public ID from Cloudinary URL after `/upload/`, stripping optional version and extension.
    const uploadSplit = imageUrl.split('/upload/');
    if (uploadSplit.length < 2) return;

    let publicId = uploadSplit[1].split('?')[0];
    publicId = publicId.replace(/^v\d+\//, '');
    publicId = publicId.replace(/\.[^/.]+$/, '');
    
    await cloudinary.uploader.destroy(publicId);
    console.log(`Deleted image: ${publicId}`);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
};

module.exports = deleteFromCloudinary;