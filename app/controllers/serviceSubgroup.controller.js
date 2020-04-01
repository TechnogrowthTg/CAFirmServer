const DbConnect = require('../../config/mysqlconnect');


const addSubServiceGroup = (req, res) => {
    var data = req.body;
    var isSubServiceGroupExits = "CALL `isSubServiceGroupExits`(?)";
    try {
        DbConnect.query(isSubServiceGroupExits, [data.ServiceSubGroupName], function (err, result) {
            if (err) {
                res.status(401).json({
                    success: false,
                    error: err,
                    message: 'Something went wrong. Please try again'
                });
            } else {
                if (result[0][0].cnt == 0) {
                    var query = "CALL `addSubServiceGroup`(?,?)";
                    DbConnect.query(query, [data.ServiceGroupId, data.ServiceSubGroupName], function (err, result) {
                        if (err) {
                            res.status(401).json({
                                success: false,
                                error: err,
                                message: 'Something went wrong. Please try again'
                            });
                        } else {
                            var selectQuery = "SELECT MAX(ServiceSubGroupId) as ServiceSubGroupId from service_sub_group";
                            try {
                                DbConnect.query(selectQuery, function (err, result) {
                                    if (err) {
                                        res.status(401).json({
                                            success: false,
                                            error: err,
                                            message: 'Something went wrong. Please try again'
                                        });
                                    } else {
                                        var query = "CALL `addSubServiceGroupLog`(?,?,?)";
                                        try {
                                            DbConnect.query(query, [data.ServiceGroupId, result[0].ServiceSubGroupId, data.ServiceSubGroupName], function (err, result) {
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
                        message: 'Service Sub Group Already Exist'
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

const getAllSubServiceGroup = (req, res) => {
    
    // var serviceData = {};

    var query = "CALL `getAllSubServiceGroup`()";
    try {
        DbConnect.query(query, function (err, result) {
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

const getSubServiceGroupById = (req, res) => {
    var query = "CALL `getSubServiceGroupById`(?)";
    try {
        DbConnect.query(query, [req.params.ServiceSubGroupId], function (err, result) {
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

const updateSubServiceGroup = (req, res) => {
    var data = req.body;
    var query = "CALL `updateSubServiceGroup`(?,?,?)";
    try {
        DbConnect.query(query, [data.ServiceSubGroupId, data.ServiceGroupId, data.ServiceSubGroupName], function (err, result) {
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

const deleteSubServiceGroup = (req, res) => {
    var data = req.body;
    var query = "CALL `deleteSubServiceGroup`(?)";
    try {
        DbConnect.query(query, [data.ServiceSubGroupId], function (err, result) {
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
    addSubServiceGroup,
    getAllSubServiceGroup,
    getSubServiceGroupById,
    updateSubServiceGroup,
    deleteSubServiceGroup,
}