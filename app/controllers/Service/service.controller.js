const DbConnect = require('../../../config/mysqlconnect');
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
 * This function represent to add new service to service Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */

 /**
 * This function represent to get all services from service Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */

// const getAllServices = (req, res) => {
//     // var query = "SELECT service.ServiceId, service_group.ServiceGroupId, service_type.ServiceTypeId ,sub_service.SubServiceId, service_pay_type.PayTypeId, service_pay.ServicePayId, (SELECT service_group.ServiceGroupName FROM service_group WHERE service_group.ServiceGroupId=service.ServiceGroupId) as ServiceGroupName,(SELECT service_type.ServiceTypeName FROM service_type WHERE service_type.ServiceTypeId=service.ServiceTypeId) as ServiceName, (SELECT sub_service.SubServiceName FROM sub_service WHERE sub_service.SubServiceId=service.SubServiceId) as SubServiceName, (SELECT service_pay_type.PayTypeName FROM service_pay_type WHERE service_pay_type.PayTypeId=service.PayTypeId) as ServicePayment, (SELECT service_pay.Amount FROM service_pay WHERE service_pay.ServicePayId=service.ServicePayId) as ServiceAmount, Frequency FROM service JOIN service_group on service.ServiceGroupId=service_group.ServiceGroupId JOIN service_type on service.ServiceTypeId=service_type.ServiceTypeId JOIN sub_service ON service.SubServiceId=sub_service.SubServiceId JOIN service_pay_type on service.PayTypeId=service_pay_type.PayTypeId JOIN service_pay on service.ServicePayId=service_pay.ServicePayId WHERE service.IsDeleted=1";
//     DbConnect.query(query, function (err, result) {
//         if (err)
//             res.status(401).json({
//                 success: false,
//                 error: err,
//                 message: 'Something went wrong. Please try again'
//             });
//         else
//             res.status(200).json({
//                 success: true,
//                 data: result,
//                 message: 'Record gets successfully'
//             });
//     });
// }

module.exports = {
    getServiceGroup,
    getServiceSubGroup,
    getServicePayment,
    getServicePayAmount,
    //insertService
    // getAllServices,
    // getServiceById,
    // updateService,
    // deleteService
}