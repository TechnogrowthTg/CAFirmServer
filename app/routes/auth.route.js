const Router = require('express').Router(),
AuthController = require('../controllers/auth.controller');
// const checkAuth = require('../../middleware');

Router.post('/login', AuthController.userLogin);
Router.post('/insertuser', AuthController.insertUser);
Router.get('/users', AuthController.getAllUsers);
Router.get('/userById/:UserId', AuthController.getUserById);
Router.post('/updateuser', AuthController.updateUser);
Router.put('/deleteuser', AuthController.deleteUser);

module.exports = Router;