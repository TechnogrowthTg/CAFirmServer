var express = require('express');
var router = express.Router();

var ContactController = require('../../controllers/Contact/ContactController');
router.post('/addcontact', ContactController.addNewContact);
router.get('/allcontact', ContactController.getAllContact);
router.get('/contactbyid/:ContactId', ContactController.getContactById);
router.post('/updatecontact', ContactController.updateContact);
router.put('/deletecontact', ContactController.deleteContact);

module.exports = router;