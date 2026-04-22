const Blog = require('../models/Blog');
const deleteFromCloudinary = require('../utils/deleteImage.js');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    
    blog.views += 1;
    await blog.save();
    
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create blog
// @route   POST /api/blogs
// @access  Private (Admin)
const createBlog = async (req, res) => {
  try {
    const blogData = JSON.parse(req.body.data);
    if (req.file) {
      blogData.image = req.file.path;
    }
    
    const blog = new Blog(blogData);
    await blog.save();
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private (Admin)
const updateBlog = async (req, res) => {
  try {
    const blogData = JSON.parse(req.body.data);
    const existingBlog = await Blog.findById(req.params.id);

    if (!existingBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (req.file) {
      if (existingBlog.image) {
        await deleteFromCloudinary(existingBlog.image);
      }
      blogData.image = req.file.path;
    }
    
    const blog = await Blog.findByIdAndUpdate(req.params.id, blogData, { new: true });
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private (Admin)
// In blogController.js delete function
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    // Delete image from Cloudinary
    if (blog.image) {
      await deleteFromCloudinary(blog.image);
    }
    
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog };
