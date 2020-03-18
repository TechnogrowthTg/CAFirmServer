var mysqlQuery = require("../../common/mysqlConnection");

/**
 * This function represent get service_master data
 * @param {*} req
 * @param {*} res
 * @author Ravi parmar
 */

function get_from_service_master(req, res) {
  var query = "SELECT * FROM service_master WHERE is_deleted=0";
  mysqlQuery.excecuteQuery(query, function(error, result) {
    if (error) {
      return res.json({
        error: true,
        message: error
      });
    } else {
      return res.json({
        error: false,
        result: result
      });
    }
  });
}


/**
 * This function represent post service_master data
 * @param {*} req
 * @param {*} res
 * @author Ravi parmar
 */

function post_into_service_master(req, res) {
    var param = req.body;
    var query = "INSERT INTO service_master (id)  VALUES ("+ param.id +")";
    mysqlQuery.excecuteQuery(query, function(error, result) {
      if (error) {
        return res.json({
          error: true,
          message: error
        });
      } else {
        return res.json({
          error: false,
          message: 'Data inserted Successfully '
        });
      }
    });
  }

module.exports = {
  get_from_service_master: get_from_service_master,
  post_into_service_master: post_into_service_master
};
