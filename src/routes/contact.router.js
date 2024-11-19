const express = require("express");
const ContactRouter = express.Router();
const ContactController = require("../controller/contact.controller");

// Route to create a contact message
ContactRouter.post("/", ContactController.createContact);

// Route to get all contact messages
ContactRouter.get("/", ContactController.getAllContacts);

// Route to get a contact message by ID
ContactRouter.get("/:id", ContactController.getContactById);

// Route to update a contact message by ID
ContactRouter.put("/:id", ContactController.updateContact);

// Route to delete a contact message by ID
ContactRouter.delete("/:id", ContactController.deleteContact);
module.exports = ContactRouter;
