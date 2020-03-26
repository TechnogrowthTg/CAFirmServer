const DbConnect = require('../../../config/mysqlconnect');

/**
 * This function represent to insert record to Client_Group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const insertGroup = (req, res) => {
    var data = req.body;
    var isGroupExits = "SELECT COUNT(`GroupName` and `GroupContact`) as cnt FROM `client_group` WHERE `GroupName` = '" + data.GroupName + "' and `GroupContact`= '" + data.GroupContact + "'";
    DbConnect.query(isGroupExits, function (err, result) {
        if (err) {
            res.status(401).json({
                success: false,
                error: err,
                message: 'Something went wrong. Please try again'
            });
        } else {

            if (result[0].cnt == 0) {
                var query = "INSERT INTO `client_group`( `GroupName`, `GroupShortName`, `GroupContact`,`CreatedDate`,`IsDeleted`) VALUES ('" + data.GroupName + "','" + data.GroupShortName + "','" + data.GroupContact + "' , now(),1)";
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
                    message: 'Group Already Exist'
                });
            }
        }

    });
}
/**
 * This function represent to get all client Group from Client Group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const getAllGroup = (req, res) => {
    var query = "SELECT `GroupId`, `GroupName`, `GroupShortName`, `GroupContact` FROM `client_group` WHERE IsDeleted = 1 ORDER by GroupId DESC";
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
 * This function represent to get a client Group by his/her GroupId from ClientGroup Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const getGroupById = (req, res) => {
    var GroupId = req.params.GroupId;
    var query = "SELECT `GroupId`, `GroupName`, `GroupShortName`, `GroupContact` FROM `client_group` WHERE IsDeleted=1 and GroupId=" + GroupId;
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
 * This function represent to update a clientGroup by his/her GroupId to ClientGroup Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */

const updateGroup = (req, res) => {
    var data = req.body;
    var query = "UPDATE client_group SET `GroupName`= '" + data.GroupName + "',`GroupShortName`= '" + data.GroupShortName + "',`GroupContact`= '" + data.GroupContact + "', `UpdatedDate` = CURRENT_TIMESTAMP() WHERE GroupId=" + data.GroupId;
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
 * This function represent to delete a clientGroup by his/her ClientGroup from ClientGroup Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const deleteGroup = (req, res) => {
    var data = req.body;
    var query = "UPDATE `client_group` SET `IsDeleted`='0' WHERE `GroupId`=" + data.GroupId;
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
    insertGroup,
    getAllGroup,
    getGroupById,
    updateGroup,
    deleteGroup,
}