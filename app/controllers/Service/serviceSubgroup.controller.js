const DbConnect = require('../../../config/mysqlconnect');

/**
 * This function represent to insert record to sub_service_group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const addSubServiceGroup = (req, res) => {
    var data = req.body;
    var isSubServiceGroupExits = "SELECT COUNT(`ServiceSubGroupName`) as cnt FROM `service_sub_group` WHERE `ServiceSubGroupName` = '" + data.ServiceSubGroupName + "'";
    DbConnect.query(isSubServiceGroupExits, function (err, result) {
        if (err) {
            res.status(401).json({
                success: false,
                error: err,
                message: 'Something went wrong. Please try again'
            });
        } else {

            if (result[0].cnt == 0) {
                var query = "INSERT INTO `service_sub_group`( `	ServiceSubGroupName`,`CreatedDate`,`IsDeleted`) VALUES ('" + data.	ServiceSubGroupName + "', now(),1)";
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
                    message: 'SubService Already Exist'
                });
            }
        }

    });
}
/**
 * This function represent to get all SubclientServiceGroup from service_sub_group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const getAllSubServiceGroup = (req, res) => {
    var query = "SELECT `ServiceSubGroupId`, `ServiceSubGroupName` FROM `service_sub_group` WHERE IsDeleted = 1 ORDER by ServiceSubGroupId DESC";
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
 * This function represent to get a SubclientServiceGroup by his/her ServiceSubGroupId from  service_sub_group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const getSubServiceGroupById = (req, res) => {
    var ServiceSubGroupId = req.params.ServiceSubGroupId;
    var query ="SELECT `ServiceSubGroupId`, `ServiceSubGroupName` FROM `service_sub_group` WHERE IsDeleted=1 and ServiceSubGroupId=" + ServiceSubGroupId;
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
 * This function represent to update a SubclientServiceGroup by his/her ServiceSubGroupId to service_sub_group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const updateSubServiceGroup = (req, res) => {
    var data = req.body;
    isSubServiceGroupExits(data.ServiceSubGroupName, function (err, result) {
        if (err)
            res.status(401).json({
                success: false,
                error: err,
                message: 'Invalid fields'
            });
        var subservicecount = result;
        if (subservicecount) {
            res.status(401).json({
                success: false,
                error: err,
                message: 'SubService Group Already Exits'
            });
        } else {
            var query = "UPDATE service_sub_group SET `ServiceSubGroupName`= '" + data.ServiceSubGroupName + "', `UpdatedDate` = CURRENT_TIMESTAMP() WHERE ServiceSubGroupId=" + data.ServiceSubGroupId;
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
    })
}

// To check whether the Service Group is exits or not.
isSubServiceGroupExits = (ServiceSubGroupName, callback) => {
    var qry = "SELECT count(ServiceSubGroupName) as cnt FROM `service_sub_group` WHERE ServiceSubGroupName like '" + ServiceSubGroupName + "' ";
    DbConnect.query(qry, function (err, result) {
        if (err)
            callback(err, null);
        if (result[0].cnt > 0)
            callback(null, true);
        else
            callback(null, false);
    });
}

/**
 * This function represent to delete a SubServiceGroup by his/her 	ServiceSubGroupId from  service_sub_group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const deleteSubServiceGroup = (req, res) => {
    var data = req.body;
    var query = "UPDATE `service_sub_group` SET `IsDeleted`='0' WHERE `ServiceSubGroupId`=" + data.ServiceSubGroupId;
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
    addSubServiceGroup,
    getAllSubServiceGroup,
    getSubServiceGroupById,
    updateSubServiceGroup,
    deleteSubServiceGroup,
}