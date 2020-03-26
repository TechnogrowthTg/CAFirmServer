const DbConnect = require('../../../config/mysqlconnect');

/**
 * This function represent to insert record into client_contact Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const insertContact = (req, res) => {
    var data = req.body;
    var isContactExits = "SELECT COUNT(`ContactPersonName` and `Email`) as cnt FROM `client_contact` WHERE `ContactPersonName` = '" + data.ContactPersonName + "' and `Email`= '" + data.Email + "'";
    DbConnect.query(isContactExits, function (err, result) {
        if (err) {
            res.status(401).json({
                success: false,
                error: err,
                message: 'Something went wrong. Please try again'
            });
        } else {

            if (result[0].cnt == 0) {
                var query = "INSERT INTO `client_contact`(`ClientId`, `ContactPersonName`, `Email`, `Designation`, `MobileNumber1`, `MobileNumber2`, `Telephone`, `Address`, `Reference`, `CurrentStatus`, `IsBroadService`, `CreatedDate`, `IsDeleted`) VALUES ('" + data.ClientId + "' ,'" + data.ContactPersonName + "','" + data.Email + "','" + data.Designation + "','" + data.MobileNumber1 + "','" + data.MobileNumber2 + "','" + data.Telephone + "','" + data.Address + "','" + data.Reference + "','" + data.CurrentStatus + "','" + data.IsBroadService + "',now(),1)";
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
                    message: 'Contact Already Exist'
                });
            }
        }

    });
}
/**
 * This function represent to get all client contacts from client_contact Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const getAllContact = (req, res) => {
    var data = req.body;
    var query = "SELECT cc.ContactId, cc.ContactPersonName, cc.Email, cc.Designation, cc.MobileNumber1, cc.MobileNumber2, cc.Telephone, cc.Address, cc.Reference, cc.CurrentStatus, cc.IsBroadService FROM client_contact as cc JOIN client as c on cc.ClientId=c.ClientId WHERE cc.IsDeleted=1 and cc.ClientId=" + data.ClientId + " " + "ORDER by cc.ContactId DESC";
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
 * This function represent to get a client contact by his/her ClientContactId from client_contact Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const getContactById = (req, res) => {
    var ContactId = req.params.ContactId;
    var query = "SELECT cc.ContactId, c.ClientId, cc.ContactPersonName, cc.Email, cc.Designation, cc.MobileNumber1, cc.MobileNumber2, cc.Telephone, cc.Address, cc.Reference, cc.CurrentStatus, cc.IsBroadService FROM client_contact as cc JOIN client as c on cc.ClientId=c.ClientId WHERE cc.IsDeleted=1 and cc.ContactId= " + ContactId;
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
 * This function represent to update a client contact by his/her ContactId to client_contact Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */

const updateContact = (req, res) => {
    var data = req.body;
    var query = "UPDATE `client_contact` SET `ClientId`= '" + data.ClientId + "', `ContactPersonName`= '" + data.ContactPersonName + "',`Email`= '" + data.Email + "',`Designation`= '" + data.Designation + "',`MobileNumber1`= '" + data.MobileNumber1 + "',`MobileNumber2`= '" + data.MobileNumber2 + "',`Telephone`= '" + data.Telephone + "',`Address`= '" + data.Address + "',`Reference`= '" + data.Reference + "',`CurrentStatus`= '" + data.CurrentStatus + "',`IsBroadService`= '" + data.IsBroadService + "',`UpdatedDate` = CURRENT_TIMESTAMP() WHERE ContactId=" + data.ContactId;
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
 * This function represent to delete a client contact by his/her ClientId from client_contact Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const deleteContact = (req, res) => {
    var data = req.body;
    var query = "UPDATE `client_contact` SET `IsDeleted`='0' WHERE `ContactId`=" + data.ContactId;
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
    insertContact,
    getAllContact,
    getContactById,
    updateContact,
    deleteContact
}