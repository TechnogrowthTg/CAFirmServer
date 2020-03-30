const DbConnect = require('../../config/mysqlconnect');


const insertPaytype = (req, res) => {
    var data = req.body;
    var isPaytypeExits = "CALL `isPaytypeExits`(?)";
    try {
        DbConnect.query(isPaytypeExits, [data.ModeOfPayment], function (err, result) {
            if (err) {
                res.status(401).json({
                    success: false,
                    error: err,
                    message: 'Something went wrong. Please try again'
                });
            } else {
                if (result[0][0].cnt == 0) {
                    var query = "CALL `insertPaytype`(?)";
                    DbConnect.query(query, [data.ModeOfPayment], function (err, result) {
                        if (err) {
                            res.status(401).json({
                                success: false,
                                error: err,
                                message: 'Something went wrong. Please try again'
                            });
                        } else {
                            var selectQuery = "SELECT MAX(PayTypeId) as PayTypeId from service_pay_type";
                            try {
                                DbConnect.query(selectQuery, function (err, result) {
                                    if (err) {
                                        res.status(401).json({
                                            success: false,
                                            error: err,
                                            message: 'Something went wrong. Please try again'
                                        });
                                    } else {
                                        var query = "CALL `insertPaytypeLog`(?,?)";
                                        try {
                                            DbConnect.query(query, [result[0].PayTypeId, data.ModeOfPayment], function (err, result) {
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
                        message: 'Service Paytype Already Exist'
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

const getAllPaytype = (req, res) => {
    var query = "CALL `getAllPaytype`()";
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

const getPaytypeById = (req, res) => {
    var query = "CALL `getPaytypeById`(?)";
    try {
        DbConnect.query(query, [req.params.PayTypeId], function (err, result) {
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

const updatePaytype = (req, res) => {
    var data = req.body;
    var query = "CALL `updatePaytype`(?,?)";
    try {
        DbConnect.query(query, [data.PayTypeId, data.ModeOfPayment], function (err, result) {
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

const deletePaytype = (req, res) => {
    var data = req.body;
    var query = "CALL `deletePaytype`(?)";
    try {
        DbConnect.query(query, [data.PayTypeId], function (err, result) {
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
    insertPaytype,
    getAllPaytype,
    getPaytypeById,
    updatePaytype,
    deletePaytype
}