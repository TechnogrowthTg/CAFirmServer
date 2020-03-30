const Router = require('express').Router(),
PaytypeController = require('../controllers/servicePaytype.controller');

Router.post('/insertPaytype', PaytypeController.insertPaytype);
Router.get('/allPaytypes',PaytypeController.getAllPaytype);
Router.get('/paytypeById/:PayTypeId', PaytypeController.getPaytypeById);
Router.post('/updatePaytype', PaytypeController.updatePaytype);
Router.put('/deletePaytype', PaytypeController.deletePaytype);

module.exports = Router;