var mysqlQuery = require('../../common/mysqlConnection');
/**
 * This function represent to get ClientGroupName from client_group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
// To get the dropdown data for ClientGroupName from client_group Master.
function getClientGroupName(req, res) {
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
function getClientContactName(req, res) {
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
 * This function represent to get ClientContactPersonList by ClientId from Client_Client_ContactMaster.
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function getClientContactList(req, res) {
    var id = req.params.ClientId;
    var query = "SELECT client_contact.ContactId, concat(client_contact.ContactPersonName, '_', client_contact.Email, '_', client_contact.MobileNumber1) as ClientContactPersonName FROM client_contact JOIN client_client_contact on client_contact.ContactId=client_client_contact.ContactId WHERE client_client_contact.ClientId=" + id;
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
 * This function represent to update a client by his/her ClientId to Client Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function updateClientById(req, res) {
    var param = req.body;
    var id = req.body.ClientId;
    var query = "UPDATE `client` JOIN `client_group` ON client.GroupId=client_group.GroupId SET `client.GroupId`='" + param.GroupId + "', `client.ClientName`='" + param.ClientName + "',`client.ClientContact`='" + param.ClientContact + "',`client.ClientEmail`='" + param.ClientEmail + "',`client.ClientCode` ='" + param.ClientCode + "',`client.GstNumber` ='" + param.GstNumber + "',`client.PanNumber`='" + param.PanNumber + "',`client.AdharNumber`='" + param.AdharNumber + "',`client.ClientAddress`='" + param.ClientAddress + "',`client.TypeOfEntity`='" + param.TypeOfEntity + "',`client.CurrentStatus`='" + param.CurrentStatus + "',`client.AgreementStatus`='" + param.AgreementStatus + "',`client.IncorporationDate`='" + param.IncorporationDate + "' WHERE client.ClientId=" + id;
    mysqlQuery.excecuteQuery(query, function (error, result) {
        if (error) {
            return res.json({
                error: true,
                message: error
            });
        } else {
            return res.json({
                error: false,
                message: "Record Updated Successfully"
            })
        }
    });
}


/**
 * This function represent to delete a client by his/her ClientId from Client Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function deleteClientById(req, res) {
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
    getClientGroupName: getClientGroupName,
    getClientContactName: getClientContactName,
    addNewClient: addNewClient,
    getAllClient: getAllClient,
    getClientById: getClientById,
    getClientContactList: getClientContactList,
    updateClientById: updateClientById,
    deleteClientById: deleteClientById
}