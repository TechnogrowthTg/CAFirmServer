const DbConnect = require('../../config/mysqlconnect');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const userLogin = (req, res) => {
    var data = req.body;
    try {
        var query = "CALL `userLogin`(?,?)";
        DbConnect.query(query, [data.email, data.password], function (err, result) {
            if (err) {
                res.status(401).json({
                    success: false,
                    error: err,
                    message: 'Something went wrong. Please try again'
                });
            } else {
                if (result[0][0].status == 0) {
                    res.status(401).json({
                        success: false,
                        error: err,
                        message: 'Invalid username or password'
                    });
                } else {

                    var user = result[0][0]
                    // console.log("User Data", user);
                    const payload = {
                        UserId: user.UserId,
                        RoleId: user.RoleId,
                        FirstName: user.FirstName,
                        LastName: user.LastName,
                        UserEmail: user.UserEmail,
                    }

                    const token = jwt.sign(payload, config.secret, {
                        expiresIn: 2400 //expires in 24 hrs
                    });
                    res.status(200).json({
                        success: true,
                        message: 'Login Success!',
                        token: token,
                        role: user.RoleId,
                    });
                }
            }
        });

    } catch (ex) {
        res.json({
            success: false,
            error: err,
            message: ex.message
        })
    }
}


const insertUser = (req, res) => {
    var data = req.body;
    var isUserExists = "CALL `getUserCount`(?,?)";
    try {
        DbConnect.query(isUserExists, [data.FirstName, data.UserEmail], function (err, result) {
            if (err) {
                res.status(401).json({
                    success: false,
                    error: err,
                    message: 'Something went wrong. Please try again'
                });
            } else {
                if (result[0][0].cnt == 0) {
                    var query = "CALL `insertUser`(?,?,?,?,?,?)";
                    DbConnect.query(query, [
                        data.RoleId,
                        data.FirstName,
                        data.LastName,
                        data.UserEmail,
                        data.Gender,
                        data.Password
                    ], function (err, result) {
                        if (err) {
                            res.status(401).json({
                                success: false,
                                error: err,
                                message: 'Something went wrong. Please try again'
                            });
                        } else {
                            var selectQuery = "SELECT MAX(UserId) as UserId from user";
                            try {
                                DbConnect.query(selectQuery, function (err, result) {
                                    if (err) {
                                        res.status(401).json({
                                            success: false,
                                            error: err,
                                            message: 'Something went wrong. Please try again'
                                        });
                                    } else {
                                        var query = "CALL `insertUserLog`(?,?,?,?,?,?,?)";
                                        try {
                                            DbConnect.query(query, [
                                                result[0].UserId,
                                                data.RoleId,
                                                data.FirstName,
                                                data.LastName,
                                                data.UserEmail,
                                                data.Gender,
                                                data.Password
                                            ], function (err, result) {
                                                if (err) {
                                                    res.status(401).json({
                                                        success: false,
                                                        error: err,
                                                        message: 'Something went wrong. Please try again'
                                                    });
                                                }
                                                else {
                                                    var selectQuery = "SELECT MAX(UserId) as UserId from user_log";
                                                    try {
                                                        DbConnect.query(selectQuery, function (err, result) {
                                                            if (err) {
                                                                res.status(401).json({
                                                                    success: false,
                                                                    error: err,
                                                                    message: 'Something went wrong. Please try again'
                                                                });
                                                            } else {
                                                                var query = "CALL `insertUserRole`(?,?)";
                                                                DbConnect.query(query, [result[0].UserId, data.RoleId], function (err, result) {
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
                                                            }
                                                        })
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


const getAllUsers = (req, res) => {
    var query = "CALL `getAllUsers`()";
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

const getUserById = (req, res) => {
    var query = "CALL `getUserById`(?)";
    try {
        DbConnect.query(query, [req.params.UserId], function (err, result) {
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

const updateUser = (req, res) => {
    var data = req.body;
    var query = "CALL `updateUser`(?,?,?,?,?,?,?)";
    try {
        DbConnect.query(query, [
            data.UserId,
            data.RoleId,
            data.FirstName,
            data.LastName,
            data.UserEmail,
            data.Gender,
            data.Password
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

const deleteUser = (req, res) => {
    var data = req.body;
    var query = "CALL `deleteUser`(?)";
    DbConnect.query(query, [data.UserId], function (err, result) {
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
    userLogin,
    insertUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
}