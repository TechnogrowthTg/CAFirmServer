var mysqlQuery = require('../../common/mysqlConnection');

/**
 * This function represent to add new service to service Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function addNewService(req, res) {
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
                result: 'Service Added Successfully'
            })
        }
    });
}

/**
 * This function represent to get all services from service Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function getAllServices(req, res) {
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
 * This function represent to get a service by his/her ServiceId from service Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function getServiceById(req, res) {
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
 * This function represent to update a service by his/her ServiceId to service Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function updateServiceById(req, res) {
    var param = req.body;
    var ServiceId = req.body.ServiceId;
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
 * This function represent to delete a service by his/her ServiceId from service Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function deleteServiceById(req, res) {
    var param = req.body;
    var ServiceId = req.body.ServiceId;
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
    addNewService: addNewService,
    getAllServices: getAllServices,
    getServiceById: getServiceById,
    updateServiceById: updateServiceById,
    deleteServiceById: deleteServiceById
}