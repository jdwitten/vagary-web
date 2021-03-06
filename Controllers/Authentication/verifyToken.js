var jwt = require('jsonwebtoken');
var secrets = require('../../secrets/secrets.js');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, secrets.auth_secret, function(err, decoded) {
    if (err) return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    console.log(decoded)
    req.userId = decoded.id;
    next();
  });
}
module.exports = verifyToken;
