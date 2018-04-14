var express = require('express')
var router = express.Router()
var Trip = require('../Models/trip.js')
var secrets = require('../secrets/secrets.js')
var verifyToken = require("./Authentication/verifyToken.js")
const db = require("../Database/Database.js")

router.post('/', verifyToken, function (req, res) {
  if(req.body.title == null ||
      req.userId == null ||
      req.body.image == null) {
        console.log("invalid request body: " + req.body)
        return res.status(400).end()
    }
  var dateString = new Date().toISOString().slice(0, 19).replace('T', ' ');
  var trip = new Trip(req.userId, req.body.title, req.body.image, dateString, null)
  console.log(trip)
  db.addTrip(trip, function(err, response) {
    if(err) {
      console.log(err)
      return res.status(500).end()
    } else {
      return res.json({success: true})
    }
  })
})

module.exports = router
