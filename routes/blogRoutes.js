const express = require('express');
const router = express.Router();
const { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const auth = require('../middleware/auth');
const { uploadBlog } = require('../middleware/cloudinaryUpload');

router.get('/', getBlogs);
router.get('/:id', getBlogById);
router.post('/', auth, uploadBlog.single('image'), createBlog);
router.put('/:id', auth, uploadBlog.single('image'), updateBlog);
router.delete('/:id', auth, deleteBlog);


module.exports = router;