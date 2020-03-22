var express = require('express');
var router = express.Router();

var AuthController = require('../../controllers/Authentication/AuthController');

router.post('/login',AuthController.userLogin);

module.exports = router;