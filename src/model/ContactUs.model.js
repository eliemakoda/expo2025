const {PrismaClient} = require("@prisma/client"); // Your Prisma client instance
const prisma= new PrismaClient()
// Contact Model Methods
const ContactModel = {
  // Create a new contact message
  createContact: async ({ name, message, email, tel }) => {
    try {
      const newContact = await prisma.contact.create({
        data: {
          name,
          message,
          email,
          tel,
        },
      });
      return newContact;
    } catch (error) {
      throw new Error(`Error creating contact: ${error.message}`);
    }
  },

  // Get all contact messages
  getAllContacts: async () => {
    try {
      const contacts = await prisma.contact.findMany();
      return contacts;
    } catch (error) {
      throw new Error(`Error fetching contacts: ${error.message}`);
    }
  },

  // Get a contact by ID
  getContactById: async (id) => {
    try {
      const contact = await prisma.contact.findUnique({
        where: { id },
      });
      return contact;
    } catch (error) {
      throw new Error(`Error fetching contact by ID: ${error.message}`);
    }
  },

  // Update a contact message by ID
  updateContact: async (id, data) => {
    try {
      const updatedContact = await prisma.contact.update({
        where: { id },
        data,
      });
      return updatedContact;
    } catch (error) {
      throw new Error(`Error updating contact: ${error.message}`);
    }
  },

  // Delete a contact message by ID
  deleteContact: async (id) => {
    try {
      await prisma.contact.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Error deleting contact: ${error.message}`);
    }
  },
};

module.exports = ContactModel;
