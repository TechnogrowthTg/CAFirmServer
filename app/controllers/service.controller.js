const DbConnect = require('../../config/mysqlconnect');
/**
 * This function represent to get ClientGroupName from service_group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
// To get the dropdown data for ServiceGroupName from service_group Master.
const getServiceGroup = (req, res) => {
    var query ="SELECT `ServiceGroupId`, `ServiceGroupName` FROM `service_group` WHERE IsDeleted=1 ORDER BY ServiceGroupId DESC"
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
 * This function represent to get SubServiceName from ` sub_service` Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
// To get the dropdown data for ServiceSubGroupName from ` service_sub_group` Master.
const getServiceSubGroup = (req, res) => {
    var query ="SELECT `ServiceSubGroupId`, `ServiceSubGroupName` FROM `service_sub_group` WHERE IsDeleted=1 ORDER BY ServiceSubGroupId DESC"
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
 * This function represent to get ServicePaymentName from ` service_pay_type` Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */

const getServicePayment = (req, res) => {
    var query ="SELECT `PayTypeId`, `ModeOfPayment` FROM `service_pay_type` WHERE IsDeleted=1 ORDER BY PayTypeId DESC"
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
 * This function represent to get ServicePayAmount from ` service_pay` Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
// To get the dropdown data for ServicePayAmount from ` service_pay` Master.
const getServicePayAmount = (req, res) => {
    var query ="SELECT `ServicePayId`, `DefaultAmount`, `PeriodOfService` FROM `service_pay` WHERE IsDeleted=1 ORDER BY ServicePayId DESC"
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
 * This function represent to Insert new service to service Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const insertService = (req, res) => {
    var data = req.body;
    var query = "INSERT INTO `service`( `ServiceGroupId`, `ServiceSubGroupId`, `PayTypeId`, `ServicePayId`, `CreatedDate`, `IsDeleted`) VALUES ('" + data.ServiceGroupId + "','" + data.ServiceSubGroupId + "','" + data.PayTypeId + "','" + data.ServicePayId + "',now(),1)";
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
 * This function represent to get all services from service Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */

const getAllServices = (req, res) => {
   var query ="SELECT service.ServiceId, service_group.ServiceGroupId,service_sub_group.ServiceSubGroupId,service_pay_type.PayTypeId, service_pay.ServicePayId, service_group.ServiceGroupName, service_sub_group.ServiceSubGroupName,service_pay_type.ModeOfPayment,service_pay.DefaultAmount,service_pay.PeriodOfService FROM service JOIN service_group on service.ServiceGroupId=service_group.ServiceGroupId JOIN service_sub_group ON service.ServiceSubGroupId=service_sub_group.ServiceSubGroupId JOIN service_pay_type on service.PayTypeId=service_pay_type.PayTypeId JOIN service_pay on service.ServicePayId=service_pay.ServicePayId WHERE service.IsDeleted=1 ORDER BY service.ServiceId DESC"
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
 * This function represent to get a service by his/her ServiceId from service Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const getServiceById = (req, res) => {
    var ServiceId = req.params.ServiceId;
    var query = "SELECT service.ServiceId, service_group.ServiceGroupId,service_sub_group.ServiceSubGroupId,service_pay_type.PayTypeId, service_pay.ServicePayId, service_group.ServiceGroupName, service_sub_group.ServiceSubGroupName,service_pay_type.ModeOfPayment,service_pay.DefaultAmount,service_pay.PeriodOfService FROM service JOIN service_group on service.ServiceGroupId=service_group.ServiceGroupId JOIN service_sub_group ON service.ServiceSubGroupId=service_sub_group.ServiceSubGroupId JOIN service_pay_type on service.PayTypeId=service_pay_type.PayTypeId JOIN service_pay on service.ServicePayId=service_pay.ServicePayId WHERE service.IsDeleted=1 and service.ServiceId=" + ServiceId;
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
 * This function represent to update a service by his/her ServiceId to service Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */

const updateService = (req, res) => {
    var data = req.body;
    var query = "UPDATE `service` SET `ServiceGroupId`='" + data.ServiceGroupId + "', `ServiceSubGroupId`='" + data.ServiceSubGroupId + "',`PayTypeId`='" + data.PayTypeId + "',`ServicePayId` ='" + data.ServicePayId + "', `UpdatedDate` = CURRENT_TIMESTAMP() WHERE `ServiceId`=" + data.ServiceId;
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



/**
 * This function represent to delete a service by his/her ServiceId from service Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */

const deleteService = (req, res) => {
    var data = req.body;
    var query = "UPDATE `service` SET `IsDeleted`='0' WHERE `ServiceId`=" + data.ServiceId;
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
    getServiceGroup,
    getServiceSubGroup,
    getServicePayment,
    getServicePayAmount,

    insertService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
}