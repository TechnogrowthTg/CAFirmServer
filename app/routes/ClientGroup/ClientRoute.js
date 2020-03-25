var express = require('express');
var router = express.Router();

var ClientController = require('../../controllers/ClientGroup/ClientController');
router.get('/groupname',ClientController.getGroupName);
router.get('/contactname', ClientController.getContactName)
router.post('/addclient', ClientController.addNewClient);
router.get('/allclient',ClientController.getAllClient);
router.get('/clientbyid/:ClientId', ClientController.getClientById);
router.post('/updateclient', ClientController.updateClient);
router.put('/deleteclient', ClientController.deleteClient);

module.exports = router;