const Router = require('express').Router(),
ServiceController = require('../controllers/service.controller');

Router.get('/servicegroup', ServiceController.getServiceGroup);
Router.get('/servicesubgroup', ServiceController.getServiceSubGroup);
Router.get('/servicepayment', ServiceController.getServicePayment);
Router.get('/serviceamount', ServiceController.getServicePayAmount);

Router.post('/insertservice', ServiceController.insertService);
Router.get('/allservice', ServiceController.getAllServices);
Router.get('/serviceById/:ServiceId', ServiceController.getServiceById);
Router.post('/updateservice', ServiceController.updateService);
Router.put('/deleteservice', ServiceController.deleteService);

module.exports = Router;