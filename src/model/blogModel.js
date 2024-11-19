const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const Blog = {
  // Create a new blog
  createBlog: async (data) => {
    try {
      const newBlog = await prisma.blog.create({
        data: data,
      });
      return newBlog;
    } catch (error) {
      console.log(`Error creating blog: ${error.message}`);
    }
  },

  // Get all blogs
  getAllBlogs: async () => {
    try {
      const blogs = await prisma.blog.findMany({
        include: { author: true }, // Include author details in the response
      });
      return blogs;
    } catch (error) {
      console.log(`Error fetching blogs: ${error.message}`);
    }
  },

  // Get a blog by ID
  getBlogById: async (id) => {
    try {
      const blog = await prisma.blog.findUnique({
        where: { id: id },
        include: { author: true }, // Include author details in the response
      });
      if (!blog) {
        throw new Error("Blog not found");
      }
      return blog;
    } catch (error) {
      console.log(`Error fetching blog by ID: ${error.message}`);
    }
  },

  // Update a blog by ID
  updateBlog: async (id, data) => {
    try {
      const updatedBlog = await prisma.blog.update({
        where: { id: id },
        data: data,
      });
      return updatedBlog;
    } catch (error) {
      console.log(`Error updating blog: ${error.message}`);
    }
  },

  // Delete a blog by ID
  deleteBlog: async (id) => {
    try {
      const deletedBlog = await prisma.blog.delete({
        where: { id: id },
      });
      return deletedBlog;
    } catch (error) {
      console.log(`Error deleting blog: ${error.message}`);
    }
  },
};

module.exports = Blog;
