var mysqlQuery = require('../../common/mysqlConnection');
/**
 * This function represent to get ClientGroupName from client_group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
// To get the dropdown data for ClientGroupName from client_group Master.
function getGroupName(req, res) {
    var query = "SELECT `GroupId`, concat(client_group.GroupName,'_',client_group.GroupShortName ) as GroupName FROM `client_group` WHERE IsDeleted=1 ORDER BY GroupId DESC";
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
 * This function represent to get ClientContact from client_contact Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
// To get the dropdown data for ClientContactPersonName from client_contact Master.
function getContactName(req, res) {
    var query = "SELECT `ContactId`, concat(client_contact.ContactPersonName, '_', client_contact.Email, '_', client_contact.MobileNumber1) as ClientContact FROM `client_contact` WHERE IsDeleted=1 ORDER BY ContactId DESC";
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
 * This function represent to insert record to Client Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function addNewClient(req, res) {
    var param = req.body;
    var isClientExits = "SELECT COUNT(`ClientName` and `ClientEmail`) as cnt FROM `client` WHERE `ClientName` = '" + param.ClientName + "' and `ClientEmail`= '" + param.ClientEmail + "'";
    mysqlQuery.excecuteQuery(isClientExits, function (error, checkResult) {
        if (error) {
            return res.json({
                error: true,
                message: error
            });
        } else {
            if (checkResult[0].cnt == 0) {
                var query = "INSERT INTO `client`( `GroupId`, `ClientName`, `ClientContact`, `ClientEmail`, `ClientCode`, `GstNumber`, `PanNumber`, `AdharNumber`, `ClientAddress`, `TypeOfEntity`, `CurrentStatus`, `AgreementStatus`, `IncorporationDate`, `CreatedDate`, `IsDeleted`) VALUES ('" + param.GroupId + "','" + param.ClientName + "','" + param.ClientContact + "','" + param.ClientEmail + "','" + param.ClientCode + "','" + param.GstNumber + "', '" + param.PanNumber + "' ,'" + param.AdharNumber + "', '" + param.ClientAddress + "','" + param.TypeOfEntity + "', '" + param.CurrentStatus + "', '" + param.AgreementStatus + "','" + param.IncorporationDate + "',now(),1)";
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
                    message: 'Client Already Exist'
                })
            }

        }
    });
}

/**
 * This function represent to get all client from Client Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function getAllClient(req, res) {
    var query = "SELECT ClientId, (SELECT concat(client_group.GroupName,'_',client_group.GroupShortName ) FROM `client_group` WHERE client.GroupId=client_group.GroupId ) as ClientGroupName , `ClientName`, `ClientContact`, `ClientEmail`, `ClientCode`, `GstNumber`, `PanNumber`, `AdharNumber`, `ClientAddress`, `TypeOfEntity`, `CurrentStatus`, `AgreementStatus`, `IncorporationDate` FROM client JOIN client_group on client.GroupId=client_group.GroupId WHERE client.IsDeleted=1 ORDER by client.ClientId DESC";
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
 * This function represent to get a client by his/her ClientId from Client Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function getClientById(req, res) {
    var id = req.params.ClientId;
    var query = "SELECT ClientId, (SELECT concat(client_group.GroupName,'_',client_group.GroupShortName ) FROM `client_group` WHERE client.GroupId=client_group.GroupId ) as ClientGroupName , `ClientName`, `ClientContact`, `ClientEmail`, `ClientCode`, `GstNumber`, `PanNumber`, `AdharNumber`, `ClientAddress`, `TypeOfEntity`, `CurrentStatus`, `AgreementStatus`, `IncorporationDate` FROM client JOIN client_group on client.GroupId=client_group.GroupId WHERE client.IsDeleted=1 and client.ClientId=" + id;
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
 * This function represent to update a client by his/her ClientId to Client Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function updateClient(req, res) {
    var param = req.body;
    isClientExits(param.ClientName, function (error, result_clientpname) {
        if (error)
            return res.json({
                error: true,
                message: "Invalid fields"
            })
        var clientcount = result_clientpname;
        if (clientcount) {
            return res.json({
                error: true,
                message: "Client Already Exits"
            })
        } else {
            var query = "UPDATE `client` SET `GroupId`='" + param.GroupId + "', `ClientName`='" + param.ClientName + "',`ClientContact`='" + param.ClientContact + "',`ClientEmail`='" + param.ClientEmail + "',`ClientCode` ='" + param.ClientCode + "',`GstNumber` ='" + param.GstNumber + "',`PanNumber`='" + param.PanNumber + "',`AdharNumber`='" + param.AdharNumber + "',`ClientAddress`='" + param.ClientAddress + "',`TypeOfEntity`='" + param.TypeOfEntity + "',`CurrentStatus`='" + param.CurrentStatus + "',`AgreementStatus`='" + param.AgreementStatus + "',`IncorporationDate`='" + param.IncorporationDate + "', `UpdatedDate` = CURRENT_TIMESTAMP() WHERE ClientId=" + param.ClientId;
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

// To check whether the Client is exist or not
function isClientExits(ClientName, callback) {
    var qry = "SELECT count(ClientName) as cnt FROM `client` WHERE ClientName like '" + ClientName + "' ";
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
 * This function represent to delete a client by his/her ClientId from Client Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function deleteClient(req, res) {
    var id = req.body.ClientId;
    var query = "UPDATE `client` SET `IsDeleted`='0' WHERE `ClientId`=" + id;
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
    getGroupName: getGroupName,
    getContactName: getContactName,
    addNewClient: addNewClient,
    getAllClient: getAllClient,
    getClientById: getClientById,
    updateClient: updateClient,
    deleteClient: deleteClient
}