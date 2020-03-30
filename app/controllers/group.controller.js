const DbConnect = require('../../config/mysqlconnect');

const insertGroup = (req, res) => {
    var data = req.body;
    var isGroupExits = "CALL `isGroupExits`(?,?)";
    try {
        DbConnect.query(isGroupExits, [data.GroupName, data.GroupContact], function (err, result) {
            if (err) {
                res.status(401).json({
                    success: false,
                    error: err,
                    message: 'Something went wrong. Please try again'
                });
            } else {
                if (result[0][0].cnt == 0) {
                    var query = "CALL `insertGroup`(?,?,?)";
                    DbConnect.query(query, [
                        data.GroupName,
                        data.GroupShortName,
                        data.GroupContact
                    ], function (err, result) {
                        if (err) {
                            res.status(401).json({
                                success: false,
                                error: err,
                                message: 'Something went wrong. Please try again'
                            });
                        } else {
                            var selectQuery = "SELECT MAX(GroupId) as GroupId from client_group";
                            try {
                                DbConnect.query(selectQuery, function (err, result) {
                                    if (err) {
                                        res.status(401).json({
                                            success: false,
                                            error: err,
                                            message: 'Something went wrong. Please try again'
                                        });
                                    } else {
                                        var query = "CALL `insertClientGroupLog`(?,?,?,?)";
                                        try {
                                            DbConnect.query(query, [
                                                result[0].GroupId,
                                                data.GroupName,
                                                data.GroupShortName,
                                                data.GroupContact
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
                        message: 'Client Group Already Exist'
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

const getAllGroup = (req, res) => {
    var query = "CALL `getAllGroup`()";
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

const getGroupById = (req, res) => {
    var query = "CALL `getGroupById`(?)";
    try {
        DbConnect.query(query, [req.params.GroupId], function (err, result) {
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

const updateGroup = (req, res) => {
    var data = req.body;
    var query = "CALL `updateGroup`(?,?,?,?)";
    try {
        DbConnect.query(query, [
            data.GroupId,
            data.GroupName,
            data.GroupShortName,
            data.GroupContact
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

const deleteGroup = (req, res) => {
    var data = req.body;
    var query = "CALL `deleteGroup`(?)";
    try {
        DbConnect.query(query, [data.GroupId], function (err, result) {
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
    insertGroup,
    getAllGroup,
    getGroupById,
    updateGroup,
    deleteGroup,
}