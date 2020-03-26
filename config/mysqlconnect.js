var mysql = require('mysql');
var util = require('util');
var pool = mysql.createPool({
    connectionLimit: 100, //important
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cafirmdb',
    debug: false
});

pool.getConnection(function (err, connection) {
    if (err)
        console.log(err)
    if (connection) connection.release()
    return
})
pool.query = util.promisify(pool.query);
module.exports = pool;