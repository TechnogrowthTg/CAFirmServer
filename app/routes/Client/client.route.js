const Router = require('express').Router(),
ClientController = require('../../controllers/Client/client.controller');

Router.get('/groupName',ClientController.getClientGroupName);
Router.post('/insertClient',ClientController.insertClient);
Router.get('/clients',ClientController.getAllClient);
Router.get('/clientById/:ClientId',ClientController.getClientById);
Router.post('/updateclient',ClientController.updateClient);
Router.put('/deleteclient',ClientController.deleteClient);

module.exports = Router;