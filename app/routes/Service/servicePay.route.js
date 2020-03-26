const Router = require('express').Router(),
ServicePayController = require('../../controllers/Service/servicePay.controller');

Router.post('/insertPay', ServicePayController.insertServicePay);
Router.get('/allPay',ServicePayController.getAllServicePay);
Router.get('/payById/:ServicePayId', ServicePayController.getServicePayById);
Router.post('/updatePay', ServicePayController.updateServicePay);
Router.put('/deletePay', ServicePayController.deleteServicePay);

module.exports = Router;