var mysqlQuery = require('../../common/mysqlConnection');

/**
 * This function represent to insert record to Client_Group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function addNewClientGroup(req, res) {
    var param = req.body;
    var isGroupExits = "SELECT COUNT(`GroupName` and `GroupContact`) as cnt FROM `client_group` WHERE `GroupName` = '" + param.GroupName + "' and `GroupContact`= '" + param.GroupContact + "'";
    mysqlQuery.excecuteQuery(isGroupExits, function (error, checkResult) {
        if (error) {
            return res.json({
                error: true,
                message: error
            });
        } else {

            if (checkResult[0].cnt == 0) {
                var query = "INSERT INTO `client_group`( `GroupName`, `GroupShortName`, `GroupContact`,`CreatedDate`,`IsDeleted`) VALUES ('" + param.GroupName + "','" + param.GroupShortName + "','" + param.GroupContact + "' , now(),1)";
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
                })
            } else {
                return res.json({
                    error: true,
                    message: 'Group Already Exist'
                })
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
function getAllClientGroup(req, res) {
    var query = "SELECT `GroupId`, `GroupName`, `GroupShortName`, `GroupContact` FROM `client_group` WHERE IsDeleted = 1 ORDER by GroupId DESC"
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
 * This function represent to get a client Group by his/her GroupId from ClientGroup Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function getClientGroupById(req, res) {
    var id = req.params.GroupId;
    var query = "SELECT `GroupId`, `GroupName`, `GroupShortName`, `GroupContact` FROM `client_group` WHERE IsDeleted=1 and GroupId=" + id;
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
 * This function represent to update a clientGroup by his/her GroupId to ClientGroup Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */

function updateClientGroupById(req, res) {
    var param = req.body;
    isClientGroupExits(param.GroupName, function (error, result_groupname) {
        if (error)
            return res.json({
                error: true,
                message: "Invalid fields"
            })
        var groupcount = result_groupname;
        if (groupcount) {
            return res.json({
                error: true,
                message: "ClientGroup is already exits!"
            })
        } else {
            var query = "UPDATE client_group SET `GroupName`= '" + param.GroupName + "',`GroupShortName`= '" + param.GroupShortName + "',`GroupContact`= '" + param.GroupContact + "',`UpdatedDate` = CURRENT_TIMESTAMP() WHERE client_group.GroupId=" + param.GroupId;
            mysqlQuery.excecuteQuery(query, function (error, result) {
                if (error)
                    return res.json({
                        error: true,
                        message: error
                    })
                else
                    return res.json({
                        error: false,
                        message: "Client Group Updated successfully"
                    })
            })
        }
    })
}

// This function is to check whether the groupname is exits in group table or not.
function isClientGroupExits(GroupName, callback) {
    var qry = "SELECT count(GroupName) as cnt FROM `client_group` WHERE GroupName like '" + GroupName + "' ";
    mysqlQuery.excecuteQuery(qry, function (error, result) {
        if (error)
            callback(error, null);
        if (result[0].cnt > 0)
            callback(null, true);
        else
            callback(null, false);

    })
}

/**
 * This function represent to delete a clientGroup by his/her ClientGroup from ClientGroup Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function deleteClientGroupById(req, res) {
    var id = req.body.GroupId;
    var query = "UPDATE `client_group` SET `IsDeleted`='0' WHERE `GroupId`=" + id;
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
    addNewClientGroup: addNewClientGroup,
    getAllClientGroup: getAllClientGroup,
    getClientGroupById: getClientGroupById,
    updateClientGroupById: updateClientGroupById,
    deleteClientGroupById: deleteClientGroupById
}