var mysql = require("mysql");
var secrets = require("../secrets/secrets.js")

var prod = {
  connectionLimit : 10,
  host            : 'db',
  user            : 'root',
  password        : 'P@11word',
  database        : 'vagarydb',
  port            : '3306'
}

var dev = {
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'P@11word',
  database        : 'vagarydb',
  port            : '3308'
}
var db_config = process.env.NODE_ENV == "production" ? prod : dev
var pool = mysql.createPool(db_config);

exports.getConnection = function(callback) {
  pool.getConnection(function(err, conn) {
    if(err) {
      return callback(err);
    }
    callback(err, conn);
  });
};
