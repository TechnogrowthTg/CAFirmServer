const Router = require('express').Router(),
ServiceGroupController = require('../controllers/serviceGroup.controller');

Router.post('/addServiceGroup', ServiceGroupController.addServiceGroup);
Router.get('/serviceGroups',ServiceGroupController.getAllServiceGroup);
Router.get('/serviceGroupById/:ServiceGroupId', ServiceGroupController.getServiceGroupById);
Router.post('/updateServiceGroup', ServiceGroupController.updateServiceGroup);
Router.put('/deleteServiceGroup', ServiceGroupController.deleteServiceGroup);

module.exports = Router;