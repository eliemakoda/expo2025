const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Event Model Methods
const EventModel = {
  // Create a new event
  createEvent: async ({ title, description, address, datetime, image, adminId }) => {
    try {
      const newEvent = await prisma.event.create({
        data: {
          title,
          description,
          address,
          datetime,
          image,  // Store filenames as a comma-separated string
          adminId,
        },
      });
      return newEvent;
    } catch (error) {
      throw new Error(`Error creating event: ${error.message}`);
    }
  },

  // Get all events
  getAllEvents: async () => {
    try {
      const events = await prisma.event.findMany();
      return events;
    } catch (error) {
      throw new Error(`Error fetching events: ${error.message}`);
    }
  },

  // Get a single event by ID
  getEventById: async (id) => {
    try {
      const event = await prisma.event.findUnique({
        where: { id },
      });
      return event;
    } catch (error) {
      throw new Error(`Error fetching event: ${error.message}`);
    }
  },

  // Update an event by ID
  updateEvent: async (id, data) => {
    try {
      const updatedEvent = await prisma.event.update({
        where: { id },
        data,
      });
      return updatedEvent;
    } catch (error) {
      throw new Error(`Error updating event: ${error.message}`);
    }
  },

  // Delete an event by ID
  deleteEvent: async (id) => {
    try {
      await prisma.event.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Error deleting event: ${error.message}`);
    }
  },
};

module.exports = EventModel;
