var express = require('express')
var router = express.Router()
var pool = require("../Database/pool.js")
var Post = require('../Models/post.js')
var secrets = require('../secrets/secrets.js')
const aws = require('aws-sdk');
aws.config.region = "us-east-2"

router.get('/', function (req, res) {
  var connection = pool.getConnection(function(err, connection){
    if(err) {
      res.send(err)
    }
    connection.query('SELECT * FROM Posts WHERE author = ?', 1, function (error, results, fields) {
      res.send({posts: results})
    })
  })
})

router.post('/', function (req, res) {
  var connection = pool.getConnection(function(err, connection){
    if(err) {
      res.send(err)
    }
    console.log(req.body)
    var post = [req.body.user, req.body.body, req.body.title, req.body.location, req.body.trip]
    console.log(post)
    connection.query('INSERT INTO Posts (author, body, title, location, trip) VALUES (?, ?, ?, ?, ?)', post, function (error, results, fields) {
      console.log(error)
      res.send({success: true})
    })
  })
})

router.get('/image/request', function (req, res) {
  const s3 = new aws.S3();
  const fileType = req.query["fileType"];
  const fileName = makeid(16) + "." + fileType;
  const s3Params = {
    Bucket: secrets.s3_bucket,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${secrets.s3_bucket}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
})

function makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = router
