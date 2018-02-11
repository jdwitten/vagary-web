var mysql = require("mysql");
var pool = mysql.createPool(
  connectionLimit : 10,
  host            : 'ec2-18-219-0-191.us-east-2.compute.amazonaws.com',
  user            : 'root',
  password        : 'P@11word',
  database        : 'vagary-mysqldb'
);

exports.getConnection = function(callback) {
  pool.getConnection(function(err, conn) {
    if(err) {
      return callback(err);
    }
    callback(err, conn);
  });
};
