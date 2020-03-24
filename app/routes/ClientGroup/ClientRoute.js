var express = require('express');
var router = express.Router();

var ClientController = require('../../controllers/ClientGroup/ClientController');
router.get('/clientgroupname',ClientController.getClientGroupName);
router.get('/clientcontactname', ClientController.getClientContactName)
router.post('/addclient', ClientController.addNewClient);
router.get('/allclient',ClientController.getAllClient);
router.get('/clientbyid/:ClientId', ClientController.getClientById);
router.get('/clientcontactlist/:ClientId', ClientController.getClientContactList)
router.post('/updateclient', ClientController.updateClientById);
router.put('/deleteclient', ClientController.deleteClientById);

module.exports = router;