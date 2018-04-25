const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const secrets = require('./secrets/secrets.js')
process.env.AWS_ACCESS_KEY_ID = secrets.s3_access_key_id
process.env.AWS_SECRET_ACCESS_KEY = secrets.s3_secret_key
console.log("Environment: " + process.env.NODE_ENV)

var drafts = require('./Controllers/drafts')
var posts = require('./Controllers/posts')
var users = require('./Controllers/users')
var trips = require('./Controllers/trips')
var authentication = require('./Controllers/Authentication/authentication')

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/drafts', drafts)
app.use('/posts', posts)
app.use('/users', users)
app.use('/auth', authentication)
app.use('/trips', trips)


app.listen(secrets.port || 8081, () => console.log('Vagary api listening on port: ' + secrets.port + '!'))

module.exports = app
