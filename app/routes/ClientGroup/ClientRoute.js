var express = require('express');
var router = express.Router();

var ClientController = require('../../controllers/ClientGroup/ClientController');
router.get('/clientgroupname',ClientController.getClientGroupName);
router.post('/addclient', ClientController.addNewClient);
router.get('/allclient',ClientController.getAllClient);
router.get('/clientbyid/:ClientId', ClientController.getClientById);
router.post('/updateclient', ClientController.updateClientById);
router.put('/deleteclient', ClientController.deleteClientById);

module.exports = router;