const express = require('express');
const AdminRouter = express.Router();
const AdminController = require('../controller/admin.controller');

AdminRouter.post('/', AdminController.createAdmin);

AdminRouter.get('/', AdminController.getAllAdmins);

AdminRouter.get('/:id', AdminController.getAdminById);

AdminRouter.get('/email/:email', AdminController.getAdminByEmail);

AdminRouter.put('/:id', AdminController.updateAdmin);

AdminRouter.delete('/:id', AdminController.deleteAdmin);

module.exports = AdminRouter;
