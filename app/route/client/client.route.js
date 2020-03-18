var express = require('express');
var router = express.Router();
var client  = require('../../controller/client/client.controller')

router.post('/client_master',client.post_into_client_master)
router.get('/client_master',client.get_from_client_master)
module.exports = router
