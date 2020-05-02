/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken');
const secret = require('../secret.js');

module.exports = (req, res, next) => {

  try {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, secret.jwtSecret, (err, decoded) => {
        if (err) {
          res.status(401).json({ you: 'shall not pass!' });
        } else {
          req.theToken = decoded;
          console.log('Token matched, moving on...', req.theToken);
          next();
        };
      });
    } else {
      throw new Error('Invalid authorization header data');
    }

  } catch(err) {
    console.log('[CATCH] in authenticate-middleware.js: ', err); //sometimes the res json doesnt actually show error data and its really a pain trying to figure out whats wrong... Thats why we log :~)
    res.status(401).json(err);
  }

};
