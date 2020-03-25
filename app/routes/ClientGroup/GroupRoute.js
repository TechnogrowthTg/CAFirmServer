var express = require('express');
var router = express.Router();

var ClientGroupController = require('../../controllers/ClientGroup/GroupController');
router.post('/addgroup', ClientGroupController.addNewGroup);
router.get('/allgroup',ClientGroupController.getAllGroup);
router.get('/groupbyid/:GroupId', ClientGroupController.getGroupById);
router.post('/updategroup', ClientGroupController.updateGroup);
router.put('/deletegroup', ClientGroupController.deleteGroup);

module.exports = router;