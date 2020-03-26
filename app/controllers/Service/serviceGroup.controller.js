const DbConnect = require('../../../config/mysqlconnect');

/**
 * This function represent to insert record to service_group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const addServiceGroup = (req, res) => {
    var data = req.body;
    var isServiceGroupExits = "SELECT COUNT(`ServiceGroupName`) as cnt FROM `service_group` WHERE `ServiceGroupName` = '" + data.ServiceGroupName + "'";
    DbConnect.query(isServiceGroupExits, function (err, result) {
        if (err) {
            res.status(401).json({
                success: false,
                error: err,
                message: 'Something went wrong. Please try again'
            });
        } else {

            if (result[0].cnt == 0) {
                var query = "INSERT INTO `service_group`( `ServiceGroupName`,`CreatedDate`,`IsDeleted`) VALUES ('" + data.ServiceGroupName + "', now(),1)";
                DbConnect.query(query, function (err, result) {
                    if (err)
                        res.status(401).json({
                            success: false,
                            error: err,
                            message: 'Something went wrong. Please try again'
                        });
                    else
                        res.status(200).json({
                            success: true,
                            data: result,
                            message: 'Record Inserted successfully'
                        });
                });
            } else {
                res.status(401).json({
                    success: false,
                    error: err,
                    message: 'Service Already Exist'
                });
            }
        }

    });
}
/**
 * This function represent to get all clientServiceGroup from service_group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const getAllServiceGroup = (req, res) => {
    var query = "SELECT `ServiceGroupId`, `ServiceGroupName` FROM `service_group` WHERE IsDeleted = 1 ORDER by ServiceGroupId DESC";
    DbConnect.query(query, function (err, result) {
        if (err)
            res.status(401).json({
                success: false,
                error: err,
                message: 'Something went wrong. Please try again'
            });
        else
            res.status(200).json({
                success: true,
                data: result,
                message: 'Record gets successfully'
            });
    });
}

/**
 * This function represent to get a clientServiceGroup by his/her ServiceGroupId from service_group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const getServiceGroupById = (req, res) => {
    var ServiceGroupId = req.params.ServiceGroupId;
    var query = "SELECT `ServiceGroupId`, `ServiceGroupName` FROM `service_group` WHERE IsDeleted=1 and ServiceGroupId=" + ServiceGroupId;
    DbConnect.query(query, function (err, result) {
        if (err) {
            res.status(401).json({
                success: false,
                error: err,
                message: 'Something went wrong. Please try again'
            });
        } else {
            res.status(200).json({
                success: true,
                data: result[0],
                message: 'Record gets successfully'
            });
        }
    });
}

/**
 * This function represent to update a clientServiceGroup by his/her ServiceGroupId to service_group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */

const updateServiceGroup = (req, res) => {
    var data = req.body;
    var query = "UPDATE service_group SET `ServiceGroupName`= '" + data.ServiceGroupName + "', `UpdatedDate` = CURRENT_TIMESTAMP() WHERE ServiceGroupId=" + data.ServiceGroupId;
    DbConnect.query(query, function (err, result) {
        if (err)
            res.status(401).json({
                success: false,
                error: err,
                message: 'Something went wrong. Please try again'
            });
        else
            res.status(200).json({
                success: true,
                message: 'Record Updated successfully'
            });
    });
}

/**
 * This function represent to delete a ServiceGroup by his/her ServiceGroupId from service_group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const deleteServiceGroup = (req, res) => {
    var data = req.body;
    var query = "UPDATE `service_group` SET `IsDeleted`='0' WHERE `ServiceGroupId`=" + data.ServiceGroupId;
    DbConnect.query(query, function (err, result) {
        if (err) {
            res.status(401).json({
                success: false,
                error: err,
                message: 'Something went wrong. Please try again'
            });
        } else {
            res.status(200).json({
                success: true,
                data: result,
                message: 'Record deleted successfully'
            });
        }
    });
}

module.exports = {
    addServiceGroup,
    getAllServiceGroup,
    getServiceGroupById,
    updateServiceGroup,
    deleteServiceGroup,
}