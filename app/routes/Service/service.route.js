const Router = require('express').Router(),
ServiceController = require('../../controllers/Service/service.controller');

Router.get('/servicegroup', ServiceController.getServiceGroup);
Router.get('/servicesubgroup', ServiceController.getServiceSubGroup);
Router.get('/servicepayment', ServiceController.getServicePayment);
Router.get('/serviceamount', ServiceController.getServicePayAmount);

// router.post('/addservice', ServiceController.addNewService);
// router.get('/allservice', ServiceController.getAllServices);
// router.get('/servicebyid/:ServiceId', ServiceController.getServiceById);
// router.post('/updateservice', ServiceController.updateService);
// router.put('/deleteservice', ServiceController.deleteService);

module.exports = Router;