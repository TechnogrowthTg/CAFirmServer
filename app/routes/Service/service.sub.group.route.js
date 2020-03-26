const Router = require('express').Router(),
SubServiceGroupController = require('../../controllers/Service/service.sub.group.controller');

Router.post('/addSubServiceGroup', SubServiceGroupController.addSubServiceGroup);
Router.get('/subServiceGroups',SubServiceGroupController.getAllSubServiceGroup);
Router.get('/SubServiceGroupById/:ServiceSubGroupId', SubServiceGroupController.getSubServiceGroupById);
Router.post('/updateSubServiceGroup', SubServiceGroupController.updateSubServiceGroup);
Router.put('/deleteSubServiceGroup', SubServiceGroupController.deleteSubServiceGroup);

module.exports = Router;