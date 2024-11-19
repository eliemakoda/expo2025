const Contact = require('../model/ContactUs.model');

const ContactController = {
  // Create a new contact message
  createContact: async (req, res) => {
    try {
      const { name, message, email, tel } = req.body;

      // Create a new contact entry
      const newContact = await Contact.createContact({
        name,
        message,
        email,
        tel,
      });

      res.status(201).json(newContact);  // Return the created contact object
    } catch (error) {
      res.status(500).json({ message: `Failed to create contact: ${error.message}` });
    }
  },

  // Get all contact messages
  getAllContacts: async (req, res) => {
    try {
      const contacts = await Contact.getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: `Failed to fetch contacts: ${error.message}` });
    }
  },

  // Get a contact by ID
  getContactById: async (req, res) => {
    const { id } = req.params;
    try {
      const contact = await Contact.getContactById(parseInt(id));
      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: `Failed to fetch contact: ${error.message}` });
    }
  },

  // Update a contact message by ID
  updateContact: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedContact = await Contact.updateContact(parseInt(id), req.body);
      res.json(updatedContact);
    } catch (error) {
      res.status(500).json({ message: `Failed to update contact: ${error.message}` });
    }
  },

  // Delete a contact message by ID
  deleteContact: async (req, res) => {
    const { id } = req.params;
    try {
      await Contact.deleteContact(parseInt(id));
      res.status(204).send();  // No content
    } catch (error) {
      res.status(500).json({ message: `Failed to delete contact: ${error.message}` });
    }
  },
};

module.exports = ContactController;
