var mysqlQuery = require('../../common/mysqlConnection');

/**
 * This function represent to insert record to Client_Group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function addNewGroup(req, res) {
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
function getAllGroup(req, res) {
    var query = "SELECT `GroupId`, `GroupName`, `GroupShortName`, `GroupContact` FROM `client_group` WHERE IsDeleted = 1 ORDER by GroupId DESC";
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
function getGroupById(req, res) {
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
function updateGroup(req, res) {
    var param = req.body;
    isGroupExits(param.GroupName, function (error, result_groupname) {
        if (error)
            return res.json({
                error: true,
                message: "Invalid fields"
            })
        var groupcount = result_groupname;
        if (groupcount) {
            return res.json({
                error: true,
                message: "Group Already Exits"
            })
        } else {
            var query = "UPDATE client_group SET `GroupName`= '" + param.GroupName + "',`GroupShortName`= '" + param.GroupShortName + "',`GroupContact`= '" + param.GroupContact + "', `UpdatedDate` = CURRENT_TIMESTAMP() WHERE GroupId=" + param.GroupId;
            mysqlQuery.excecuteQuery(query, function (error, result) {
                if (error)
                    return res.json({
                        error: true,
                        message: error
                    })
                else
                    return res.json({
                        error: false,
                        message: "Record Updated successfully"
                    })
            })
        }
    })
}

// To check whether the group is exist or not
function isGroupExits(GroupName, callback) {
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
function deleteGroup(req, res) {
    var param = req.body;
    var query = "UPDATE `client_group` SET `IsDeleted`='0' WHERE `GroupId`=" + param.GroupId;
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
    addNewGroup: addNewGroup,
    getAllGroup: getAllGroup,
    getGroupById: getGroupById,
    updateGroup: updateGroup,
    deleteGroup: deleteGroup
}