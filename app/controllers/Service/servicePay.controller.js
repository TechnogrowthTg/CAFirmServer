const DbConnect = require('../../../config/mysqlconnect');

/**
 * This function represent to insert record to ServicePay Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const insertServicePay = (req, res) => {
    var data = req.body;
    var isPayExits = "SELECT COUNT(`DefaultAmount` and `PeriodOfService`) as cnt FROM `service_pay` WHERE `DefaultAmount` = '" + data.DefaultAmount + "' and `PeriodOfService`= '" + data.PeriodOfService + "'";
    DbConnect.query(isPayExits, function (err, result) {
        if (err) {
            res.status(401).json({
                success: false,
                error: err,
                message: 'Something went wrong. Please try again'
            });
        } else {

            if (result[0].cnt == 0) {
                var query = "INSERT INTO `service_pay`( `DefaultAmount`, `PeriodOfService`,`CreatedDate`,`IsDeleted`) VALUES ('" + data.DefaultAmount + "','" + data.PeriodOfService + "', now(),1)";
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
                    message: 'Pay Already Exist'
                });
            }
        }

    });
}
/**
 * This function represent to get all ServicePay from service_pay Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const getAllServicePay = (req, res) => {
    var query = "SELECT `ServicePayId`, `DefaultAmount`, `PeriodOfService` FROM `service_pay` WHERE IsDeleted = 1 ORDER by ServicePayId DESC";
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
 * This function represent to get a ServicePayById by his/her ServicePayId from  service_pay Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const getServicePayById = (req, res) => {
    var ServicePayId = req.params.ServicePayId;
    var query = "SELECT `ServicePayId`, `DefaultAmount`, `PeriodOfService` FROM `service_pay` WHERE IsDeleted=1 and ServicePayId=" + ServicePayId;
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
 * This function represent to update a ServicePay by his/her ServicePayId to service_pay Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */

const updateServicePay = (req, res) => {
    var data = req.body;
    var query = "UPDATE service_pay SET `DefaultAmount`= '" + data.DefaultAmount + "',`PeriodOfService`= '" + data.PeriodOfService + "', `UpdatedDate` = CURRENT_TIMESTAMP() WHERE ServicePayId=" + data.ServicePayId;
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
 * This function represent to delete a ServicePay by his/her ServicePayId from service_pay Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const deleteServicePay = (req, res) => {
    var data = req.body;
    var query = "UPDATE `service_pay` SET `IsDeleted`='0' WHERE `ServicePayId`=" + data.ServicePayId;
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
    insertServicePay,
    getAllServicePay,
    getServicePayById,
    updateServicePay,
    deleteServicePay,
}