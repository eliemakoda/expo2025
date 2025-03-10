const Event = require("../model/eventModel.model");
const multer = require("multer");
const path = require("path");

// Handle multiple file upload and event creation
const EventController = {
  // Create a new event with multiple images
  createEvent: async (req, res) => {
    try {
      const { title, description, address, datetime, adminId } = req.body;

      // Extract filenames of uploaded files (store only filenames, not the full path)
      const fileNames = req.files.map((file) => file.filename);

      // Create the new event entry in the database
      const newEvent = await Event.createEvent({
        title,
        description,
        address,
        datetime,
        image: fileNames.join(","), // Store filenames as a comma-separated string
        adminId: parseInt(adminId),
      });

      return res.status(201).json(newEvent); // Return the created event object
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ message: `Failed to create event: ${error.message}` });
    }
  },

  // Get all events
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.getAllEvents();

      // Format the image paths dynamically (from filenames)
      const formattedEvents = events.map((event) => ({
        ...event,
        image: event.image,
      }));

      res.json(formattedEvents);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Failed to fetch events: ${error.message}` });
    }
  },

  // Get a single event by ID
  getEventById: async (req, res) => {
    const { id } = req.params;
    try {
      const event = await Event.getEventById(parseInt(id));

      // Format the image paths dynamically (from filenames)
      event.image = event.image
      res.json(event);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Failed to fetch event by ID: ${error.message}` });
    }
  },

  // Update an event by ID
  updateEvent: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedEvent = await Event.updateEvent(parseInt(id), req.body);
      res.json(updatedEvent);
    } catch (error) {
      res
        .status(500)
        .json({ message: `Failed to update event: ${error.message}` });
    }
  },

  // Delete an event by ID
  deleteEvent: async (req, res) => {
    const { id } = req.params;
    try {
      await Event.deleteEvent(parseInt(id));
      res.status(204).send(); // No content
    } catch (error) {
      res
        .status(500)
        .json({ message: `Failed to delete event: ${error.message}` });
    }
  },
};

module.exports = EventController;
