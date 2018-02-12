var express = require('express')
var router = express.Router()
var User = require("../Models/user.js")
var pool = require("../Database/pool.js")

router.get('/', function (req, res) {
  var connection = pool.getConnection(function(err, connection){
    if(err) {
      res.send(err)
    }
    connection.query('SELECT * FROM Users', function (error, results, fields) {
      res.send({"users": results})
    })
  })
})

module.exports = router
