var express = require('express')
var router = express.Router()
var Draft = require('../Models/draft.js')

router.get('/', function (req, res) {
  res.send({"drafts": [new Draft("a", "c", "c")]})
})

module.exports = router
