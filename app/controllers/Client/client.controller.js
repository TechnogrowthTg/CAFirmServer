const DbConnect = require('../../../config/mysqlconnect');

/**
 * This function represent to get ClientGroupName from client_group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
// To get the dropdown data for ClientGroupName from client_group Master.
const getClientGroupName = (req, res) => {
    var query = "SELECT `GroupId`, `GroupName` FROM `client_group` WHERE IsDeleted=1 ORDER BY GroupId DESC";
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
 * This function represent to insert record to Client Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const insertClient = (req, res) => {
    var data = req.body;
    var isClientExits = "SELECT COUNT(`ClientName` and `ClientEmail`) as cnt FROM `client` WHERE `ClientName` = '" + data.ClientName + "' and `ClientEmail`= '" + data.ClientEmail + "'";
    DbConnect.query(isClientExits, function (err, result) {
        if (err) {
            res.status(401).json({
                success: false,
                error: err,
                message: 'Something went wrong. Please try again'
            });
        } else {

            if (result[0].cnt == 0) {
                var query = "INSERT INTO `client`( `GroupId`, `ClientName`, `ClientEmail`, `GstNumber`, `PanNumber`, `AdharNumber`, `ClientAddress`, `TypeOfEntity`, `CurrentStatus`, `AgreementStatus`, `IncorporationDate`, `CreatedDate`, `IsDeleted`) VALUES ('" + data.GroupId + "','" + data.ClientName + "','" + data.ClientEmail + "','" + data.GstNumber + "', '" + data.PanNumber + "' ,'" + data.AdharNumber + "', '" + data.ClientAddress + "','" + data.TypeOfEntity + "', '" + data.CurrentStatus + "', '" + data.AgreementStatus + "','" + data.IncorporationDate + "',now(),1)";
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
                    message: 'Client Already Exist'
                });
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
const getAllClient = (req, res) => {
    var query = "SELECT c.ClientId, cg.GroupName, c.ClientName, c.ClientEmail, c.GstNumber, c.PanNumber, c.AdharNumber, c.ClientAddress, c.TypeOfEntity, c.CurrentStatus, c.AgreementStatus, c.IncorporationDate FROM client as c JOIN client_group as cg on c.GroupId=cg.GroupId WHERE c.IsDeleted=1 ORDER BY c.ClientId DESC";
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
 * This function represent to get a client by his/her ClientId from Client Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const getClientById = (req, res) => {
    var ClientId = req.params.ClientId;
    var query = "SELECT c.ClientId, cg.GroupName, c.ClientName, c.ClientEmail, c.GstNumber, c.PanNumber, c.AdharNumber, c.ClientAddress, c.TypeOfEntity, c.CurrentStatus, c.AgreementStatus, c.IncorporationDate FROM client as c JOIN client_group as cg on c.GroupId=cg.GroupId WHERE c.IsDeleted=1 and c.ClientId=" + ClientId;
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
 * This function represent to update a client by his/her ClientId to Client Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */

const updateClient = (req, res) => {
    var data = req.body;
    var query = "UPDATE `client` SET `GroupId`='" + data.GroupId + "', `ClientName`='" + data.ClientName + "',`ClientEmail`='" + data.ClientEmail + "',`GstNumber` ='" + data.GstNumber + "',`PanNumber`='" + data.PanNumber + "',`AdharNumber`='" + data.AdharNumber + "',`ClientAddress`='" + data.ClientAddress + "',`TypeOfEntity`='" + data.TypeOfEntity + "',`CurrentStatus`='" + data.CurrentStatus + "',`AgreementStatus`='" + data.AgreementStatus + "',`IncorporationDate`='" + data.IncorporationDate + "', `UpdatedDate` = CURRENT_TIMESTAMP() WHERE ClientId=" + data.ClientId;
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
 * This function represent to delete a client by his/her ClientId from Client Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const deleteClient = (req, res) => {
    var ClientId = req.body.ClientId;
    var query = "UPDATE `client` SET `IsDeleted`='0' WHERE `ClientId`=" + ClientId;
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
    getClientGroupName,
    insertClient,
    getAllClient,
    getClientById,
    updateClient,
    deleteClient
}