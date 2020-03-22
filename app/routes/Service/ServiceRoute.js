var express = require('express');
var router = express.Router();

var ServiceController = require('../../controllers/Service/ServiceController');
router.post('/addservice', ServiceController.addNewService);
router.get('/allservice', ServiceController.getAllServices);
router.get('/servicebyid/:ServiceId', ServiceController.getServiceById);
router.post('/updateservice', ServiceController.updateServiceById);
router.put('/deleteservice', ServiceController.deleteServiceById);

module.exports = router;