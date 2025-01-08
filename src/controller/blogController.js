const Blog = require('../model/blogModel');
const multer = require('multer');
const path = require('path');

// Handle multiple file upload and blog creation
const BlogController = {
  // Create a new blog with multiple files
  createBlog: async (req, res) => {
    try {
      const { title, description, authorId, date, link } = req.body;

      // Extract filenames of uploaded files (store only filenames, not the full path)
      const fileNames = req.files.map(file => file.filename);

      // Create the new blog entry
      const newBlog = await Blog.createBlog({
        title,
        description,
        authorId: parseInt(authorId),
        date,
        image: fileNames.join(','),  // Store comma-separated filenames
        link,
      });

      res.status(201).json(newBlog);  
    } catch (error) {
      res.status(500).json({ message: `Failed to create blog: ${error.message}` });
    }
  },

  // Get all blogs
  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.getAllBlogs();
      const formattedBlogs = blogs.map(blog => ({
        ...blog,
        image: blog.image.split(',').map(file => `http://localhost:5000/${file}`).join(','),
      }));
      res.json(formattedBlogs);
    } catch (error) {
      res.status(500).json({ message: `Failed to fetch blogs: ${error.message}` });
    }
  },

  // Get a blog by ID
  getBlogById: async (req, res) => {
    const { id } = req.params;
    try {
      const blog = await Blog.getBlogById(parseInt(id));
      // Format the image path dynamically
      blog.image = blog.image.split(',').map(file => `http://localhost:5000/${file}`).join(',');
      res.json(blog);
    } catch (error) {
      res.status(500).json({ message: `Failed to fetch blog by ID: ${error.message}` });
    }
  },

  // Update a blog by ID
  updateBlog: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedBlog = await Blog.updateBlog(parseInt(id), req.body);
      res.json(updatedBlog);
    } catch (error) {
      res.status(500).json({ message: `Failed to update blog: ${error.message}` });
    }
  },

  // Delete a blog by ID
  deleteBlog: async (req, res) => {
    const { id } = req.params;
    try {
      await Blog.deleteBlog(parseInt(id));
      res.status(204).send();  // No content
    } catch (error) {
      res.status(500).json({ message: `Failed to delete blog: ${error.message}` });
    }
  },
};

module.exports = BlogController;
