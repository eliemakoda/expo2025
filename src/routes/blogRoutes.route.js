const express = require('express');
const BlogRouter = express.Router();
const multer = require('multer');
const BlogController = require('../controller/blogController');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), "/src/assets"));  // Folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Naming convention: timestamp + original file extension
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Limit file size to 10MB
});

BlogRouter.post('/', upload.array('images', 5), BlogController.createBlog); // 'images' is the field name, and we allow up to 5 files

// Other blog routes
BlogRouter.get('/', BlogController.getAllBlogs);
BlogRouter.get('/:id', BlogController.getBlogById);
BlogRouter.put('/:id', BlogController.updateBlog);
BlogRouter.delete('/:id', BlogController.deleteBlog);

module.exports = BlogRouter;
