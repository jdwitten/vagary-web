var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs")
var secrets = require("../../secrets/secrets.js")
var pool = require("../../Database/pool.js")
var VerifyToken = require("./verifyToken.js")
var User = require("../../Models/user.js")

router.post("/register", function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8)

  var connection = pool.getConnection(function(err, connection){
    if(err) {
      return res.status(500).end()
    }
    var user = [req.body.username, req.body.email, hashedPassword]
    connection.query('INSERT INTO Users (username, email, password) VALUES (?, ?, ?)', user, function (error, result, fields) {
      if(error) {
        console.log(error)
        return res.status(500).end
      }

      var token = jwt.sign({ id: result.insertId }, secrets.auth_secret, {
        expiresIn: 86400
      });

      res.status(200).send({ auth: true, token: token });
    });
  });
});

router.get('/me', VerifyToken, function(req, res) {
  var user = User.get(req.userId, function(user, error) {
    if(error) res.status(404).end()
    res.status(200).json({id: user.id, email: user.email, username: user.username })
  });
});

router.post("/login", function(req, res) {
  var connection = pool.getConnection(function(err, connection){
    if(err) {
      return res.status(500).end()
    }
    var email = req.body.email
    connection.query('SELECT * FROM Users WHERE email = ? LIMIT 1', email, function (error, result, fields) {
      if(error, !result, result.length < 1) return res.status(404).end()
      var user = result[0]
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user.id }, secrets.auth_secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    });
  });
});

module.exports = router;
