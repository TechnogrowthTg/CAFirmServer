var express = require('express');
var router = express.Router();

var ServiceController = require('../../controllers/Service/ServiceController');

router.get('/servicegroup', ServiceController.getServiceGroup);
router.get('/servicename', ServiceController.getServiceName);
router.get('/subservicename', ServiceController.getSubServiceName);
// router.get('/servicepayment', ServiceController.getServicePayment);
router.get('/serviceamount', ServiceController.getServicePayAmount);

// router.post('/addservice', ServiceController.addNewService);
router.get('/allservice', ServiceController.getAllServices);
router.get('/servicebyid/:ServiceId', ServiceController.getServiceById);
// router.post('/updateservice', ServiceController.updateService);
router.put('/deleteservice', ServiceController.deleteService);

module.exports = router;