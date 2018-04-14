var express = require('express')
var router = express.Router()
var pool = require("../Database/pool.js")
var Post = require('../Models/post.js')
var secrets = require('../secrets/secrets.js')
var verifyToken = require("./Authentication/verifyToken.js")
const aws = require('aws-sdk');
aws.config.region = "us-east-2"

router.get('/', verifyToken, function (req, res) {
  var connection = pool.getConnection(function(err, connection){
    if(err) {
      return res.status(500).end()
    }
    connection.query('SELECT * FROM Posts WHERE author = ?', 1, function (error, results, fields) {
      const posts = results.map(post => {
        return {
          id: post.id,
          author: post.author,
          body: post.body,
          title: post.title,
          trip: {
            id: 0,
            title: post.trip == null ? "" : post.trip,
            posts: []
          },
          location: post.location
        }
      })
      console.log(posts)
      return res.json({posts: posts})
    })
  })
})

router.post('/', verifyToken, function (req, res) {
  var connection = pool.getConnection(function(err, connection){
    if(err) {
      console.log(err)
      return res.send(err)
    }
    if(req.body == null ||
       req.userId == null ||
       req.body.body == null ||
       req.body.title == null ||
       req.body.trip == null) {
         console.log("invalid request body")
         console.log(req.body)
         return res.status(400).end()
    }
    console.log(req.body)
    var dateString = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var post = [req.userId, req.body.body, req.body.title, req.body.location, req.body.trip, dateString]
    connection.query('INSERT INTO Posts (author, body, title, location, trip, date_created) VALUES (?, ?, ?, ?, ?, ?)', post, function (error, results, fields) {
      if(error) {
        console.log(error)
        return res.status(400).end()
      } else {
        return res.json({success: true})
      }
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
      return res.status(500).end();
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
