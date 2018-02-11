var express = require('express')
var router = express.Router()
var User = require("./Models/user.js")
var getConnection = require("./Data/pool.js")

router.get('/', function (req, res) {
  var connection = getConnection(function(err, connection){
    connection.query('SELECT * FROM Users', function (error, results, fields) {
      res.send({"users": results})
    }
  })
})

modules.exports = router
