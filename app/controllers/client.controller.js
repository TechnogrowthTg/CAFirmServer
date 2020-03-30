const DbConnect = require('../../config/mysqlconnect');

const getClientGroupName = (req, res) => {
    var query = "CALL `getClientGroupName`()";
    try {
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
    } catch (ex) {
        res.status(401).json({
            success: false,
            error: err,
            message: ex.message
        });
    }
}


const  insertClient = (req, res)  => {
    var data = req.body;
    var isClientExits = "CALL `isClientExits`(?,?)";
    try {
      DbConnect.query(isClientExits, [data.ClientName, data.ClientEmail], function (err, result) {
            if (err) {
                res.status(401).json({
                    success: false,
                    error: err,
                    message: 'Something went wrong. Please try again'
                });
            } else {
                if (result[0][0].cnt == 0) {
                    var query = "CALL `insertClient`(?,?,?,?,?,?,?,?,?,?,?,?)";
                        DbConnect.query(query, [
                        data.GroupId,
                        data.ClientName,
                        data.ClientEmail,
                        data.ClientCode,
                        data.GstNumber,
                        data.PanNumber,
                        data.AdharNumber,
                        data.ClientAddress,
                        data.TypeOfEntity,
                        data.CurrentStatus,
                        data.AgreementStatus,
                        data.IncorporationDate
                    ],  function (err, result) {
                        if (err) {
                            res.status(401).json({
                                success: false,
                                error: err,
                                message: 'Something went wrong. Please try again'
                            });
                        } else {
                            var selectQuery = "SELECT MAX(ClientId) as ClientId from client";
                            try {
                             DbConnect.query(selectQuery, function (err, result) {
                                    if (err) {
                                        res.status(401).json({
                                            success: false,
                                            error: err,
                                            message: 'Something went wrong. Please try again'
                                        });
                                    } else {
                                        var query = "CALL `insertClientLog`(?,?,?,?,?,?,?,?,?,?,?,?,?)";
                                        try {
                                           DbConnect.query(query, [
                                                result[0].ClientId,
                                                data.GroupId,
                                                data.ClientName,
                                                data.ClientEmail,
                                                data.ClientCode,
                                                data.GstNumber,
                                                data.PanNumber,
                                                data.AdharNumber,
                                                data.ClientAddress,
                                                data.TypeOfEntity,
                                                data.CurrentStatus,
                                                data.AgreementStatus,
                                                data.IncorporationDate
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
                        message: 'User Already Exist'
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

const getAllClient = (req, res) => {
    var query = "CALL `getAllClient`()";
    try {
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
    } catch (ex) {
        res.status(401).json({
            success: false,
            error: err,
            message: ex.message
        });
    }
}

const getClientById = (req, res) => {
    var query = "CALL `getClientById`(?)";
    try {
        DbConnect.query(query, [req.params.ClientId], function (err, result) {
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

const updateClient = (req, res) => {
    var data = req.body;
    var query = "CALL `updateClient`(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    try {
        DbConnect.query(query, [
            data.ClientId,
            data.GroupId,
            data.ClientName,
            data.ClientEmail,
            data.ClientCode,
            data.GstNumber,
            data.PanNumber,
            data.AdharNumber,
            data.ClientAddress,
            data.TypeOfEntity,
            data.CurrentStatus,
            data.AgreementStatus,
            data.IncorporationDate
        ], function (err, result) {
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
    } catch (ex) {
        res.status(401).json({
            success: false,
            error: err,
            message: ex.message
        });
    }
}

const deleteClient = (req, res) => {
    var data = req.body;
    var query = "CALL `deleteClient`(?)";
    try {
        DbConnect.query(query, [data.ClientId], function (err, result) {
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
    getClientGroupName,
    insertClient,
    getAllClient,
    getClientById,
    updateClient,
    deleteClient
}