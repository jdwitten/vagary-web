var pool = require("./pool.js")
var Trip = require("../Models/trip.js")


var Database = function() {
}

Database.addTrip = function(trip, callback) {
  var connection = pool.getConnection(function(err, connection){
    if(err) {
      return callback(err)
    }
    connection.query('INSERT INTO Trips SET ?', trip.tripForPosting(), function (error, results, fields) {
      connection.release()
      if(error) {
        console.log(error)
        return callback(error)
      } else {
        trip.id = results.insertId
        return callback(null, trip)
      }
    })
  })
}

module.exports = Database
