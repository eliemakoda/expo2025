const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const Admin = {
  createAdmin: async (data) => {
    try {
      const newAdmin = await prisma.admin.create({
        data: data,
      });
      return newAdmin;
    } catch (error) {
      console.log(`Error creating admin: ${error.message}`);
    }
  },

  getAllAdmins: async () => {
    try {
      const admins = await prisma.admin.findMany();
      return admins;
    } catch (error) {
      console.log(`Error fetching all admins: ${error.message}`);
    }
  },

  getAdminById: async (id) => {
    try {
      const admin = await prisma.admin.findUnique({
        where: { id: id },
      });
      if (!admin) {
        throw new Error('Admin not found');
      }
      return admin;
    } catch (error) {
      console.log(`Error fetching admin by ID: ${error.message}`);
    }
  },

  getAdminByEmail: async (email) => {
    try {
      const admin = await prisma.admin.findUnique({
        where: { AdminEmail: email },
      });
      if (!admin) {
        throw new Error('Admin not found');
      }
      return admin;
    } catch (error) {
      console.log(`Error fetching admin by email: ${error.message}`);
    }
  },

  updateAdmin: async (id, data) => {
    try {
      const updatedAdmin = await prisma.admin.update({
        where: { id: id },
        data: data,
      });
      return updatedAdmin;
    } catch (error) {
      console.log(`Error updating admin: ${error.message}`);
    }
  },

  deleteAdmin: async (id) => {
    try {
      const deletedAdmin = await prisma.admin.delete({
        where: { id: id },
      });
      return deletedAdmin;
    } catch (error) {
      console.log(`Error deleting admin: ${error.message}`);
    }
  },
};

module.exports = Admin;
