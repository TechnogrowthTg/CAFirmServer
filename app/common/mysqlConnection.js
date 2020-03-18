var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100, //important
    host: 'localhost',
    user: 'root',
    password: '',
    database:'cafirm',
    debug: false
});

function excecuteQuery(query, callback) {
    pool.getConnection(function (err, connection) {
        if (err) {
            callback({ "code": 100, "status": "Error in connection database" }, null);
            return;
        }
        connection.query(query, function (err, rows) {
            connection.release();
            if (!err) {
                callback(null, rows);
            }
        });
        connection.on('error', function (err) {
            callback({ "code": 100, "status": "Error in connection database" }, null);
            return;
        });
    })
}


function excecuteAsyncAwaitQuery(query) {
    return new Promise(function (resolve, reject) {

        pool.getConnection(function (err, connection) {
            if (err) {
                resolve({ "code": 100, "status": "Error in connection database" }, null);
                return;
            }
            connection.query(query, function (err, rows) {
                connection.release();
                if (!err) {
                    return resolve({
                        error: false,
                        result: rows
                    });
                }
                else {
                    return resolve({
                        error: true,
                        error_no: err.errno,
                        err_code: err.code
                    });
                }
            });
            connection.on('error', function (err) {
                resolve({ "code": 100, "status": "Error in connection database" }, null);
                return;
            });
        })
    })
}

module.exports = {
    excecuteQuery: excecuteQuery,
    excecuteAsyncAwaitQuery: excecuteQuery

}