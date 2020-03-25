var mysqlQuery = require('../../common/mysqlConnection');

/**
 * This function represent to insert record into client_contact Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function addNewContact(req, res) {
    var param = req.body;
    var isContactExits = "SELECT COUNT(`ContactPersonName` and `Email`) as cnt FROM `client_contact` WHERE `ContactPersonName` = '" + param.ContactPersonName + "' and `Email`= '" + param.Email + "'";
    mysqlQuery.excecuteQuery(isContactExits, function (error, checkResult) {
        if (error) {
            return res.json({
                error: true,
                message: error
            });
        } else {

            if (checkResult[0].cnt == 0) {
                var query = "INSERT INTO `client_contact`(`ContactPersonName`, `Email`, `Designation`, `MobileNumber1`, `MobileNumber2`, `Telephone`, `Address`, `Reference`, `CurrentStatus`, `IsBroadService`, `CreatedDate`, `IsDeleted`) VALUES ('" + param.ContactPersonName + "','" + param.Email + "','" + param.Designation + "','" + param.MobileNumber1 + "','" + param.MobileNumber2 + "','" + param.Telephone + "','" + param.Address + "','" + param.Reference + "','" + param.CurrentStatus + "','" + param.IsBroadService + "',now(),1)";
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
                    message: 'Client Contact is Already Exist'
                })
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
function getAllContact(req, res) {
    var query = 'SELECT `ContactId`, `ContactPersonName`, `Email`, `Designation`, `MobileNumber1`, `MobileNumber2`, `Telephone`, `Address`, `Reference`, `CurrentStatus`, `IsBroadService` FROM `client_contact` WHERE IsDeleted = 1 ORDER by ContactId DESC';
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
 * This function represent to get a client contact by his/her ClientContactId from client_contact Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function getContactById(req, res) {
    var id = req.params.ContactId;
    var query = 'SELECT `ContactId`, `ContactPersonName`, `Email`, `Designation`, `MobileNumber1`, `MobileNumber2`, `Telephone`, `Address`, `Reference`, `CurrentStatus`, `IsBroadService` FROM `client_contact` WHERE IsDeleted = 1 and ContactId=' + id;
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
 * This function represent to update a client contact by his/her ContactId to client_contact Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function updateContact(req, res) {
    var param = req.body;
    isContactExits(param.ContactPersonName, function (error, result_contact) {
        if (error)
            return res.json({
                error: true,
                message: "Invalid fields"
            })
        var contactcount = result_contact;
        if (contactcount) {
            return res.json({
                error: true,
                message: "Contact Already Exits"
            })
        } else {
            var query = "UPDATE `client_contact` SET `ContactPersonName`= '" + param.ContactPersonName + "',`Email`= '" + param.Email + "',`Designation`= '" + param.Designation + "',`MobileNumber1`= '" + param.MobileNumber1 + "',`MobileNumber2`= '" + param.MobileNumber2 + "',`Telephone`= '" + param.Telephone + "',`Address`= '" + param.Address + "',`Reference`= '" + param.Reference + "',`CurrentStatus`= '" + param.CurrentStatus + "',`IsBroadService`= '" + param.IsBroadService + "',`UpdatedDate` = CURRENT_TIMESTAMP() WHERE ContactId=" + param.ContactId;
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

// To check whether the ContactPersonName is exist or not
function isContactExits(ContactPersonName, callback) {
    var qry = "SELECT count(ContactPersonName) as cnt FROM `client_contact` WHERE ContactPersonName like '" + ContactPersonName + "' ";
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
 * This function represent to delete a client contact by his/her ClientId from client_contact Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
function deleteContact(req, res) {
    var id = req.body.ContactId;
    var query = "UPDATE `client_contact` SET `IsDeleted`='0' WHERE `ContactId`=" + id;
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
    addNewContact: addNewContact,
    getAllContact: getAllContact,
    getContactById: getContactById,
    updateContact: updateContact,
    deleteContact: deleteContact
}