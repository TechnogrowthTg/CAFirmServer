var express = require('express');
var router = express.Router();

var ContactController = require('../../controllers/Contact/ContactController');
router.post('/addcontact', ContactController.addNewClientContact);
router.get('/allcontact', ContactController.getAllClientContact);
router.get('/contactbyid/:ContactId', ContactController.getClientContactById);
router.post('/updatecontact', ContactController.updateClientContactById);
router.put('/deletecontact', ContactController.deleteClientContactById);

module.exports = router;