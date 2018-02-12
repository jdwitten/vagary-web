const express = require('express')
const app = express()

var drafts = require('./Controllers/drafts')
var posts = require('./Controllers/posts')
var users = require('./Controllers/users')

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/drafts', drafts)
app.use('/posts', posts)
app.use('/users', users)


app.listen(80, () => console.log('Vagary api listening on port 80!'))
