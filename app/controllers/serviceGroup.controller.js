const DbConnect = require('../../config/mysqlconnect');


const addServiceGroup = (req, res) => {
    var data = req.body;
    var isServiceGroupExits = "CALL `isServiceGroupExits`(?)";
    try {
        DbConnect.query(isServiceGroupExits, [data.ServiceGroupName], function (err, result) {
            if (err) {
                res.status(401).json({
                    success: false,
                    error: err,
                    message: 'Something went wrong. Please try again'
                });
            } else {
                if (result[0][0].cnt == 0) {
                    var query = "CALL `addServiceGroup`(?)";
                    DbConnect.query(query, [data.ServiceGroupName], function (err, result) {
                        if (err) {
                            res.status(401).json({
                                success: false,
                                error: err,
                                message: 'Something went wrong. Please try again'
                            });
                        } else {
                            var selectQuery = "SELECT MAX(ServiceGroupId) as ServiceGroupId from service_group";
                            try {
                                DbConnect.query(selectQuery, function (err, result) {
                                    if (err) {
                                        res.status(401).json({
                                            success: false,
                                            error: err,
                                            message: 'Something went wrong. Please try again'
                                        });
                                    } else {
                                        var query = "CALL `addServiceGroupLog`(?,?)";
                                        try {
                                            DbConnect.query(query, [result[0].ServiceGroupId, data.ServiceGroupName], function (err, result) {
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
                        message: 'Service Group Already Exist'
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

const getAllServiceGroup = (req, res) => {
    var query = "CALL `getAllServiceGroup`()";
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

const getServiceGroupById = (req, res) => {
    var query = "CALL `getServiceGroupById`(?)";
    try {
        DbConnect.query(query, [req.params.ServiceGroupId], function (err, result) {
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

const updateServiceGroup = (req, res) => {
    var data = req.body;
    var query = "CALL `updateServiceGroup`(?,?)";
    try {
        DbConnect.query(query, [data.ServiceGroupId, data.ServiceGroupName], function (err, result) {
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

const deleteServiceGroup = (req, res) => {
    var data = req.body;
    var query = "CALL `deleteServiceGroup`(?)";
    try {
        DbConnect.query(query, [data.ServiceGroupId], function (err, result) {
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
    addServiceGroup,
    getAllServiceGroup,
    getServiceGroupById,
    updateServiceGroup,
    deleteServiceGroup,
}