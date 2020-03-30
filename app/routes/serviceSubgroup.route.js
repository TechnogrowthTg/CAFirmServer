const Router = require('express').Router(),
ServiceSubGroupController = require('../controllers/serviceSubgroup.controller');

Router.post('/addSubServiceGroup', ServiceSubGroupController.addSubServiceGroup);
Router.get('/subServiceGroups',ServiceSubGroupController.getAllSubServiceGroup);
Router.get('/SubServiceGroupById/:ServiceSubGroupId', ServiceSubGroupController.getSubServiceGroupById);
Router.post('/updateSubServiceGroup', ServiceSubGroupController.updateSubServiceGroup);
Router.put('/deleteSubServiceGroup', ServiceSubGroupController.deleteSubServiceGroup);

module.exports = Router;