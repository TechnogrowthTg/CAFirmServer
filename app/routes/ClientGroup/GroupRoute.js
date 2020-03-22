var express = require('express');
var router = express.Router();

var ClientGroupController = require('../../controllers/ClientGroup/GroupController');
router.post('/addclientgroup', ClientGroupController.addNewClientGroup);
router.get('/allclientgroup',ClientGroupController.getAllClientGroup);
router.get('/clientgroupbyid/:GroupId', ClientGroupController.getClientGroupById);
router.post('/updateclient', ClientGroupController.updateClientGroupById);
router.put('/deleteclientgroup', ClientGroupController.deleteClientGroupById);

module.exports = router;