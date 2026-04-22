const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const createUpload = (folder) => {
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      resource_type: 'image'
    }
  });

  return multer({ storage });
};

const uploadProject = createUpload('portfolio/projects');
const uploadBlog = createUpload('portfolio/blogs');
const uploadCertificate = createUpload('portfolio/certificates');

// Keep default export for existing imports in project routes.
module.exports = uploadProject;
module.exports.uploadProject = uploadProject;
module.exports.uploadBlog = uploadBlog;
module.exports.uploadCertificate = uploadCertificate;
module.exports.cloudinary = cloudinary;