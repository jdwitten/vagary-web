var mysql = require("mysql");
var secrets = require("../secrets/secrets.js")
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'P@11word',
  database        : 'vagary-mysqldb'
});

exports.getConnection = function(callback) {
  pool.getConnection(function(err, conn) {
    if(err) {
      return callback(err);
    }
    callback(err, conn);
  });
};
