var express = require('express');
var router = express.Router();
var service  = require('../../controller/service/service.controller')

router.post('/service_master',service.post_into_service_master)
router.get('/service_master',service.get_from_service_master)
module.exports = router