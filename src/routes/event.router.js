const express = require('express');
const EventRouter = express.Router();
const multer = require('multer');
const EventController = require('../controller/event.controller');
const path = require('path');

// Setup multer for handling multiple file uploads
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

EventRouter.post('/', upload.array('images', 5), EventController.createEvent);  // Allow up to 5 files

EventRouter.get('/', EventController.getAllEvents);
EventRouter.get('/:id', EventController.getEventById);
EventRouter.put('/:id', EventController.updateEvent);
EventRouter.delete('/:id', EventController.deleteEvent);

module.exports = EventRouter;
