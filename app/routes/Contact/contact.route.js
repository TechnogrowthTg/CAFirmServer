const Router = require('express').Router(),
ClientContactController = require('../../controllers/Contact/contact.controller');

Router.post('/insertContact', ClientContactController.insertContact);
Router.get('/contacts', ClientContactController.getAllContact);
Router.get('/contactById/:ContactId', ClientContactController.getContactById);
Router.post('/updateContact', ClientContactController.updateContact);
Router.put('/deleteContact', ClientContactController.deleteContact);

module.exports = Router;