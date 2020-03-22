var mysqlQuery = require('../../common/mysqlConnection');

/**
 * This function represent to insert record into client_contact Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function addNewClientContact(req, res) {
    var param = req.body;
    var query = '';
    mysqlQuery.excecuteQuery(query, function (error, result) {
        if (error) {
            return res.json({
                error: true,
                message: error
            });
        } else {
            return res.json({
                error: false,
                result: 'Client Added Successfully'
            })
        }
    });
}

/**
 * This function represent to get all client contacts from client_contact Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function getAllClientContact(req, res) {
    var query = '';
    mysqlQuery.excecuteQuery(query, function (error, result) {
        if (error) {
            return res.json({
                error: true,
                message: error
            });
        } else {
            return res.json({
                error: false,
                result: result
            })
        }
    });
}

/**
 * This function represent to get a client contact by his/her ClientContactId from client_contact Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function getClientContactById(req, res) {
    var id = req.params.id;
    var query = '';
    mysqlQuery.excecuteQuery(query, function (error, result) {
        if (error) {
            return res.json({
                error: true,
                message: error
            });
        } else {
            return res.json({
                error: false,
                result: result[0]
            })
        }
    });
}


/**
 * This function represent to update a client contact by his/her ClientContactId to client_contact Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function updateClientContactById(req, res) {
    var param = req.body;
    var ClientContactId = req.body.ClientContactId;
    var query = '';
    mysqlQuery.excecuteQuery(query, function (error, result) {
        if (error) {
            return res.json({
                error: true,
                message: error
            });
        } else {
            return res.json({
                error: false,
                message: "Record Updated Successfully"
            })
        }
    });
}

/**
 * This function represent to delete a client contact by his/her ClientId from client_contact Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function deleteClientContactById(req, res) {
    var param = req.body;
    var ClientContactId = req.body.ClientContactId;
    var query = '';
    mysqlQuery.excecuteQuery(query, function (error, result) {
        if (error) {
            return res.json({
                error: true,
                message: error
            });
        } else {
            return res.json({
                error: false,
                result: result
            })
        }
    });
}


module.exports = {
    addNewClientContact: addNewClientContact,
    getAllClientContact: getAllClientContact,
    getClientContactById: getClientContactById,
    updateClientContactById: updateClientContactById,
    deleteClientContactById: deleteClientContactById
}