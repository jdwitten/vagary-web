var pool = require("../Database/pool.js")
function User(id, username, email, password) {
  this.id = id
  this.username = username
  this.email = email
  this.password = password
}

User.get = function(id, callback) {
  if(!id) callback(null, "Invalid ID")
  var connection = pool.getConnection( function(err, connection) {
    if(err) return callback(null, err)
    connection.query('SELECT * FROM Users WHERE id = ? LIMIT 1', id, function (error, result, fields) {
      if(error || !result || result.length < 1) callback(null, error)
      callback(new User(result[0].id, result[0].username, result[0].email, result[0].password), null)
    });
  });
}


module.exports = User
