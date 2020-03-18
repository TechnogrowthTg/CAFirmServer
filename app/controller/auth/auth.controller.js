var mysqlQuery = require("../../common/mysqlConnection");
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
var config = require("../../../config/config");
var dateFormat = require("dateformat");

/**
 * This function represent Employee Login
 * @param {*} req
 * @param {*} res
 * @author Ravi parmar
 */

const login = (req, res) => {
  var param = req.body;
  var now = new Date();
  var current_date = dateFormat(now, "isoDate");
  if (!param.email && !param.password)
    return res.json({
      error: true,
      message: "Please provide valid credentials"
    });
  var query =
    "SELECT * FROM user_master WHERE email='" +
    param.email +
    "' AND password='" +
    param.password +
    "' AND is_deleted=0";
  mysqlQuery.excecuteQuery(query, function(error, result) {
    if (error)
      return res.json({
        error: true,
        message: error
      });
    if (result.length > 0) {
      // setting token for this authorized user, attach user detail with this token
      var payload = {
        empcode: result[0].empcode,
        email: result[0].email,
        id: result[0].id,
        role: result[0].role
      };
      var token = jwt.sign(payload, config.secret, {
        // expiresIn: 21600 // expires in 6 hours
        expiresIn: 28800 // expires in 8 hours
      });
      // add this token in response, So that user can send this token in every request to validate himself.
      result[0].token = token;
      result[0].password = undefined;
      return res.json({
        error: false,
        result: result
      });
    }
    return res.json({
      error: true,
      message: "Username/ Password invalid"
    });
  });
};
module.exports = {
  login
};
