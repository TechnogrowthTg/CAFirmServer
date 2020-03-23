var mysqlQuery = require("../../common/mysqlConnection");
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
var config = require("../../../config/config");
// var dateFormat = require("dateformat");

/**
 * This function represent user Login
 * @param {*} req 
 * @param {*} res 
 * @author Ravi parmar
 */
function userLogin(req, res) {
  var param = req.body;
  // var now = new Date();
  // var current_date = dateFormat(now, "isoDate");
  var query = "SELECT * FROM user WHERE UserEmail='" + param.email + "' AND Password='" + param.password + "' AND IsDeleted=1";
  mysqlQuery.excecuteQuery(query, function (error, result) {
    if (error) {
      return res.json({
        error: true,
        message: error
      })
    }
    if (result.length > 0) {

      var payload = {
        UserId: result[0].UserId,
        // RoleId: result[0].RoleId,
        // UserName: result[0].UserName,
        UserEmail: result[0].UserEmail,
        Password: result[0].Password,
        // IsDeleted: result[0].IsDeleted
      }

      var token = jwt.sign(payload, config.secret, { expiresIn: 28800 });
      result[0].token = token
      result[0].Password = undefined
      return res.json({
        error: false,
        result: result
      })

    } else {
      return res.json({
        error: true,
        message: 'Email and Password is Invalid'
      })
    }

  });

}

module.exports = {
  userLogin: userLogin,
}
