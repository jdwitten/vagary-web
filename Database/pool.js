var mysql = require("mysql");
var secrets = require("../secrets/secrets.js")

var db_config = {
  connectionLimit : 10,
  host            : secrets.mysqldbhost,
  user            : secrets.mysqldbuser,
  password        : secrets.mysqldbpassword,
  database        : 'vagarydb',
  port            : '3306'
}

console.log(db_config)

var pool = mysql.createPool(db_config);

exports.getConnection = function(callback) {
  pool.getConnection(function(err, conn) {
    if(err) {
      return callback(err);
    }
    callback(err, conn);
  });
};
