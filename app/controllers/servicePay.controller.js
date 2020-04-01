const DbConnect = require('../../config/mysqlconnect');

const insertServicePay = (req, res) => {
    var data = req.body;
    var isPayExits = "CALL `isPayExits`(?,?)";
    try {
        DbConnect.query(isPayExits, [data.DefaultAmount, data.PeriodOfService], function (err, result) {
            if (err) {
                res.status(401).json({
                    success: false,
                    error: err,
                    message: 'Something went wrong. Please try again'
                });
            } else {
                if (result[0][0].cnt == 0) {
                    var query = "CALL `insertServicePay`(?,?,?,?)";
                    DbConnect.query(query, [
                        data.ServiceGroupId,
                        data.ServiceSubGroupId,
                        data.DefaultAmount,
                        data.PeriodOfService
                    ], function (err, result) {
                        if (err) {
                            res.status(401).json({
                                success: false,
                                error: err,
                                message: 'Something went wrong. Please try again'
                            });
                        } else {
                            var selectQuery = "SELECT MAX(ServicePayId) as ServicePayId from service_pay";
                            try {
                                DbConnect.query(selectQuery, function (err, result) {
                                    if (err) {
                                        res.status(401).json({
                                            success: false,
                                            error: err,
                                            message: 'Something went wrong. Please try again'
                                        });
                                    } else {
                                        var query = "CALL `insertServicePayLog`(?,?,?,?,?)";
                                        try {
                                            DbConnect.query(query, [
                                                result[0].ServicePayId,
                                                data.ServiceGroupId,
                                                data.ServiceSubGroupId,
                                                data.DefaultAmount,
                                                data.PeriodOfService
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
                        message: 'Service Pay Already Exist'
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

const getAllServicePay = (req, res) => {
    var query = "CALL `getAllServicePay`()";
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
                    data: result[0],
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

const getServicePayById = (req, res) => {
    var query = "CALL `getServicePayById`(?)";
    try {
        DbConnect.query(query, [req.params.ServicePayId], function (err, result) {
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
    } catch (ex) {
        res.status(401).json({
            success: false,
            error: err,
            message: ex.message
        });
    }
}

const updateServicePay = (req, res) => {
    var data = req.body;
    var query = "CALL `updateServicePay`(?,?,?,?,?)";
    try {
        DbConnect.query(query, [
            data.ServicePayId,
            data.ServiceGroupId,
            data.ServiceSubGroupId,
            data.DefaultAmount,
            data.PeriodOfService
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

const deleteServicePay = (req, res) => {
    var data = req.body;
    var query = "CALL `deleteServicePay`(?)";
    try {
        DbConnect.query(query, [data.ServicePayId], function (err, result) {
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
    insertServicePay,
    getAllServicePay,
    getServicePayById,
    updateServicePay,
    deleteServicePay,
}