const DbConnect = require('../../../config/mysqlconnect');

/**
 * This function represent to insert record to service_pay_type Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const insertPaytype = (req, res) => {
    var data = req.body;
    var isPaytypeExits = "SELECT COUNT(`ModeOfPayment`) as cnt FROM `service_pay_type` WHERE `ModeOfPayment` = '" + data.ModeOfPayment + "'";
    DbConnect.query(isPaytypeExits, function (err, result) {
        if (err) {
            res.status(401).json({
                success: false,
                error: err,
                message: 'Something went wrong. Please try again'
            });
        } else {

            if (result[0].cnt == 0) {
                var query = "INSERT INTO `service_pay_type`( `ModeOfPayment`,`CreatedDate`,`IsDeleted`) VALUES ('" + data.ModeOfPayment + "', now(),1)";
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
                    message: 'Paytype Already Exist'
                });
            }
        }

    });
}
/**
 * This function represent to get all Paytype from service_pay_type Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const getAllPaytype = (req, res) => {
    var query = "SELECT `PayTypeId`, `ModeOfPayment` FROM `service_pay_type` WHERE IsDeleted = 1 ORDER by PayTypeId DESC";
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
 * This function represent to get a Paytype by his/her PayTypeId from service_pay_type Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const getPaytypeById = (req, res) => {
    var PayTypeId = req.params.PayTypeId;
    var query = "SELECT `PayTypeId`, `ModeOfPayment` FROM `service_pay_type` WHERE IsDeleted=1 and PayTypeId=" + PayTypeId;
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
 * This function represent to update a Paytype by his/her PaytyeId to service_pay_type Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */


const updatePaytype = (req, res) => {
    var data = req.body;
    var query = "UPDATE service_pay_type SET `ModeOfPayment`= '" + data.ModeOfPayment + "', `UpdatedDate` = CURRENT_TIMESTAMP() WHERE 	PayTypeId=" + data.PayTypeId;
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
 * This function represent to delete a Paytype by his/her service_pay_type from service_group Master
 * @param {*} req 
 * @param {*} res 
 * @author Amol Dhamale
 */
const deletePaytype = (req, res) => {
    var data = req.body;
    var query = "UPDATE `service_pay_type` SET `IsDeleted`='0' WHERE `PayTypeId`=" + data.PayTypeId;
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
    insertPaytype,
    getAllPaytype,
    getPaytypeById,
    deletePaytype,
    updatePaytype,
}