var mysql = require("mysql");
var secrets = require("../secrets/secrets.js")
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'db',
  user            : 'root',
  password        : 'P@11word',
  database        : 'vagarydb',
  port            : '3306'
});

exports.getConnection = function(callback) {
  pool.getConnection(function(err, conn) {
    if(err) {
      return callback(err);
    }
    callback(err, conn);
  });
};
