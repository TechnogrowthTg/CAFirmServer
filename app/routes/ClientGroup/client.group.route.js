const Router = require('express').Router(),
ClientGroupController = require('../../controllers/ClientGroup/group.controller');

Router.post('/insertGroup', ClientGroupController.insertGroup);
Router.get('/groups',ClientGroupController.getAllGroup);
Router.get('/groupById/:GroupId', ClientGroupController.getGroupById);
Router.post('/updateGroup', ClientGroupController.updateGroup);
Router.put('/deleteGroup', ClientGroupController.deleteGroup);

module.exports = Router;