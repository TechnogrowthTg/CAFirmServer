var mysqlQuery = require('../../common/mysqlConnection');


/**
 * This function represent to get ClientGroupName from service_group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
// To get the dropdown data for ServiceGroupName from service_group Master.
function getServiceGroup(req, res) {
    var query ="SELECT `ServiceGroupId`, `ServiceGroupName` FROM `service_group` WHERE IsDeleted=1 ORDER BY ServiceGroupId DESC"
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
 * This function represent to get ServiceName from `service_type` Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
// To get the dropdown data for ServiceName from `service_type` Master.
function getServiceName(req, res) {
    var query ="SELECT `ServiceTypeId`, `ServiceTypeName` FROM `service_type` WHERE IsDeleted=1 ORDER BY ServiceTypeId DESC"
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
 * This function represent to get SubServiceName from ` sub_service` Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
// To get the dropdown data for SubServiceName from ` sub_service` Master.
function getSubServiceName(req, res) {
    var query ="SELECT `SubServiceId`, `SubServiceName` FROM `sub_service` WHERE IsDeleted=1 ORDER BY SubServiceId DESC"
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
 * This function represent to get ServicePaymentName from ` service_pay_type` Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
// To get the dropdown data for ServicePaymentName from ` service_pay_type` Master.
// function getServicePayment(req, res) {
//     var query ="SELECT `PayTypeId`, `PayTypeName` FROM `service_pay_type` WHERE IsDeleted=1 ORDER BY PayTypeId DESC"
//     mysqlQuery.excecuteQuery(query, function (error, result) {
//         if (error) {
//             return res.json({
//                 error: true,
//                 message: error
//             });
//         } else {
//             return res.json({
//                 error: false,
//                 result: result
//             })
//         }
//     });
// }


/**
 * This function represent to get ServicePayAmount from ` service_pay` Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
// To get the dropdown data for ServicePayAmount from ` service_pay` Master.
function getServicePayAmount(req, res) {
    var query ="SELECT `ServicePayId`, `Amount` FROM `service_pay` WHERE IsDeleted=1 ORDER BY ServicePayId DESC"
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
 * This function represent to add new service to service Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
// function addNewService(req, res) {
//     var param = req.body;
//     var query = "INSERT INTO `service`(`ServiceGroupId`, `ServiceTypeId`, `SubServiceId`, `PayTypeId`, `ServicePayId`, `Frequency`, `CreatedDate`, `IsDeleted`) VALUES ('" + param.ServiceGroupId + "','" + param.ServiceTypeId + "','" + param.SubServiceId + "','" + param.PayTypeId + "','" + param.ServicePayId + "','" + param.Frequency + "' , now(),1)";
//     mysqlQuery.excecuteQuery(query, function (error, result) {
//         if (error) {
//             return res.json({
//                 error: true,
//                 message: error
//             });
//         } else {
//             return res.json({
//                 error: false,
//                 result: 'Service Added Successfully'
//             })
//         }
//     });
// }

/**
 * This function represent to get all services from service Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function getAllServices(req, res) {
    var query = "SELECT service.ServiceId, service_group.ServiceGroupId, service_type.ServiceTypeId ,sub_service.SubServiceId, service_pay_type.PayTypeId, service_pay.ServicePayId, (SELECT service_group.ServiceGroupName FROM service_group WHERE service_group.ServiceGroupId=service.ServiceGroupId) as ServiceGroupName,(SELECT service_type.ServiceTypeName FROM service_type WHERE service_type.ServiceTypeId=service.ServiceTypeId) as ServiceName, (SELECT sub_service.SubServiceName FROM sub_service WHERE sub_service.SubServiceId=service.SubServiceId) as SubServiceName, (SELECT service_pay_type.PayTypeName FROM service_pay_type WHERE service_pay_type.PayTypeId=service.PayTypeId) as ServicePayment, (SELECT service_pay.Amount FROM service_pay WHERE service_pay.ServicePayId=service.ServicePayId) as ServiceAmount, Frequency FROM service JOIN service_group on service.ServiceGroupId=service_group.ServiceGroupId JOIN service_type on service.ServiceTypeId=service_type.ServiceTypeId JOIN sub_service ON service.SubServiceId=sub_service.SubServiceId JOIN service_pay_type on service.PayTypeId=service_pay_type.PayTypeId JOIN service_pay on service.ServicePayId=service_pay.ServicePayId WHERE service.IsDeleted=1";
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
    var id = req.params.ServiceId;
    var query = "SELECT service.ServiceId, service_group.ServiceGroupId, service_type.ServiceTypeId ,sub_service.SubServiceId, service_pay_type.PayTypeId, service_pay.ServicePayId, (SELECT service_group.ServiceGroupName FROM service_group WHERE service_group.ServiceGroupId=service.ServiceGroupId) as ServiceGroupName,(SELECT service_type.ServiceTypeName FROM service_type WHERE service_type.ServiceTypeId=service.ServiceTypeId) as ServiceName, (SELECT sub_service.SubServiceName FROM sub_service WHERE sub_service.SubServiceId=service.SubServiceId) as SubServiceName, (SELECT service_pay_type.PayTypeName FROM service_pay_type WHERE service_pay_type.PayTypeId=service.PayTypeId) as ServicePayment, (SELECT service_pay.Amount FROM service_pay WHERE service_pay.ServicePayId=service.ServicePayId) as ServiceAmount, Frequency FROM service JOIN service_group on service.ServiceGroupId=service_group.ServiceGroupId JOIN service_type on service.ServiceTypeId=service_type.ServiceTypeId JOIN sub_service ON service.SubServiceId=sub_service.SubServiceId JOIN service_pay_type on service.PayTypeId=service_pay_type.PayTypeId JOIN service_pay on service.ServicePayId=service_pay.ServicePayId WHERE service.ServiceId=" + id;
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
// function updateService(req, res) {
//     var param = req.body;
//     var query = "UPDATE `service` SET `ServiceGroupId`= '" + param.ServiceGroupId + "',`ServiceTypeId`= '" + param.ServiceTypeId + "',`SubServiceId`= '" + param.SubServiceId + "',`PayTypeId`= '" + param.PayTypeId + "',`ServicePayId`= '" + param.ServicePayId + "',`Frequency`= '" + param.Frequency + "', `UpdatedDate` = CURRENT_TIMESTAMP() WHERE ServiceId=" + param.ServiceId;
//     mysqlQuery.excecuteQuery(query, function (error, result) {
//         if (error) {
//             return res.json({
//                 error: true,
//                 message: error
//             });
//         } else {
//             return res.json({
//                 error: false,
//                 message: "Record Updated Successfully"
//             })
//         }
//     });
// }

/**
 * This function represent to delete a service by his/her ServiceId from service Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function deleteService(req, res) {
    var param = req.body;
    var query = "UPDATE `service` SET `IsDeleted`='0' WHERE `ServiceId`=" + param.ServiceId;
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
    getServiceGroup: getServiceGroup,
    getServiceName: getServiceName,
    getSubServiceName: getSubServiceName,
    // getSServicePayment: getServicePayment,
    getServicePayAmount: getServicePayAmount,

    // addNewService: addNewService,
    getAllServices: getAllServices,
    getServiceById: getServiceById,
    // updateService: updateService,
    deleteService: deleteService
}