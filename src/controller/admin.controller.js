const Admin = require("../model/admin.model");
const {
  hashPassword,
  verifyPassword,
  validatePassword,
} = require("../../utils");

const AdminController = {
  // Create a new admin
  createAdmin: async (req, res) => {
    try {
      const { AdminName, AdminEmail, adminPassword } = req.body;
      const hashedPassword = await hashPassword(adminPassword);
      const newAdmin = await Admin.createAdmin({
       "AdminName": AdminName,
        "AdminEmail":AdminEmail,
        "adminPassword":hashedPassword,
      });
      res.status(201).json(newAdmin);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Failed to create admin: ${error.message}` });
    }
  },

  // Get all admins
  getAllAdmins: async (req, res) => {
    try {
      const admins = await Admin.getAllAdmins();
      res.json(admins);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Failed to fetch admins: ${error.message}` });
    }
  },

  // Get an admin by ID
  getAdminById: async (req, res) => {
    const { id } = req.params;
    try {
      const admin = await Admin.getAdminById(parseInt(id));
      res.json(admin);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Failed to fetch admin by ID: ${error.message}` });
    }
  },

  // Get an admin by email
  getAdminByEmail: async (req, res) => {
    const { email } = req.params;
    try {
      const admin = await Admin.getAdminByEmail(email);
      res.json(admin);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Failed to fetch admin by email: ${error.message}` });
    }
  },

  // Update an admin
  updateAdmin: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedAdmin = await Admin.updateAdmin(parseInt(id), req.body);
      res.json(updatedAdmin);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Failed to update admin: ${error.message}` });
    }
  },

  // Delete an admin
  deleteAdmin: async (req, res) => {
    const { id } = req.params;
    try {
      await Admin.deleteAdmin(parseInt(id));
      res.status(204).send(); // No content
    } catch (error) {
      res
        .status(500)
        .json({ message: `Failed to delete admin: ${error.message}` });
    }
  },
};

module.exports = AdminController;
