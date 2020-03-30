const DbConnect = require('../../config/mysqlconnect');

const insertContact = (req, res) => {
    var data = req.body;
    var isContactExits = "CALL `isContactExits`(?,?)";
    try {
        DbConnect.query(isContactExits, [data.ContactPersonName, data.Email], function (err, result) {
            if (err) {
                res.status(401).json({
                    success: false,
                    error: err,
                    message: 'Something went wrong. Please try again'
                });
            } else {
                if (result[0][0].cnt == 0) {
                    var query = "CALL `insertContact`(?,?,?,?,?,?,?,?,?,?,?)";
                    DbConnect.query(query, [
                        data.ClientId,
                        data.ContactPersonName,
                        data.Email,
                        data.Designation,
                        data.MobileNumber1,
                        data.MobileNumber2,
                        data.Telephone,
                        data.Address,
                        data.Reference,
                        data.CurrentStatus,
                        data.IsBroadService
                    ], function (err, result) {
                        if (err) {
                            res.status(401).json({
                                success: false,
                                error: err,
                                message: 'Something went wrong. Please try again'
                            });
                        } else {
                            var selectQuery = "SELECT MAX(ContactId) as ContactId from client_contact";
                            try {
                                DbConnect.query(selectQuery, function (err, result) {
                                    if (err) {
                                        res.status(401).json({
                                            success: false,
                                            error: err,
                                            message: 'Something went wrong. Please try again'
                                        });
                                    } else {
                                        var query = "CALL `insertContactLog`(?,?,?,?,?,?,?,?,?,?,?,?)";
                                        try {
                                            DbConnect.query(query, [
                                                result[0].ContactId,
                                                data.ClientId,
                                                data.ContactPersonName,
                                                data.Email,
                                                data.Designation,
                                                data.MobileNumber1,
                                                data.MobileNumber2,
                                                data.Telephone,
                                                data.Address,
                                                data.Reference,
                                                data.CurrentStatus,
                                                data.IsBroadService
                                            ], function (err, result) {
                                                if (err) {
                                                    res.status(401).json({
                                                        success: false,
                                                        error: err,
                                                        message: 'Something went wrong. Please try again'
                                                    });
                                                }
                                                else {
                                                    res.status(200).json({
                                                        success: true,
                                                        data: result,
                                                        message: 'Record gets successfully'
                                                    });
                                                }

                                            });
                                        } catch (ex) {
                                            res.status(401).json({
                                                success: false,
                                                error: err,
                                                message: ex.message
                                            });
                                        }

                                    }

                                });
                            } catch (ex) {
                                res.status(401).json({
                                    success: false,
                                    error: err,
                                    message: ex.message
                                });
                            }
                        }
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

    } catch (ex) {
        res.status(401).json({
            success: false,
            error: err,
            message: ex.message
        });
    }
}

const getAllContact = (req, res) => {
    var query = "CALL `getAllContact`()";
    try {
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
                    message: 'Record gets successfully'
                });
            }

        });
    } catch (ex) {
        res.status(401).json({
            success: false,
            error: err,
            message: ex.message
        });
    }
}

const getContactById = (req, res) => {
    var query = "CALL `getContactById`(?)";
    try {
        DbConnect.query(query, [req.params.ContactId], function (err, result) {
            if (err) {
                res.status(401).json({
                    success: false,
                    error: err,
                    message: 'Something went wrong. Please try again'
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: result[0][0],
                    message: 'Record gets successfully'
                });
            }
        });
    } catch (ex) {
        res.status(401).json({
            success: false,
            error: err,
            message: ex.message
        });
    }
}

const updateContact = (req, res) => {
    var data = req.body;
    var query = "CALL `updateContact`(?,?,?,?,?,?,?,?,?,?,?,?)";
    try {
        DbConnect.query(query, [
            data.ContactId,
            data.ClientId,
            data.ContactPersonName,
            data.Email,
            data.Designation,
            data.MobileNumber1,
            data.MobileNumber2,
            data.Telephone,
            data.Address,
            data.Reference,
            data.CurrentStatus,
            data.IsBroadService
        ], function (err, result) {
            if (err) {
                res.status(401).json({
                    success: false,
                    error: err,
                    message: 'Something went wrong. Please try again'
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Record Updated successfully'
                });
            }
        });
    } catch (ex) {
        res.status(401).json({
            success: false,
            error: err,
            message: ex.message
        });
    }
}

const deleteContact = (req, res) => {
    var data = req.body;
    var query = "CALL `deleteContact`(?)";
    try {
        DbConnect.query(query, [data.ContactId], function (err, result) {
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
    } catch (ex) {
        res.status(401).json({
            success: false,
            error: err,
            message: ex.message
        });
    }

}


module.exports = {
    insertContact,
    getAllContact,
    getContactById,
    updateContact,
    deleteContact
}