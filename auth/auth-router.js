const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../secret.js');
const Model = require('./auth-model.js');

router.post('/register', (req, res) => {
  let userData = req.body;
  const hash = bcrypt.hashSync(userData.password, 16);
  userData.password = hash;

  Model.insertUser(userData)
    .then(newUser => {
      const token = generateToken(newUser);
      res.status(201).json({ newUser, token });
    })
    .catch(err => {
      res.status(500).json({ MESSAGE: 'Error With Account Registration...', err });
    })

});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Model.findBy({ username })
    .first()
    .then(userData => {
      if (userData && bcrypt.compareSync(password, userData.password)) {
        const token = generateToken(userData);
        res.status(200).json({ MESSAGE: `Welcome back, ${userData.username}. Your token is ${token}` });
      } else {
        res.status(401).json({ MESSAGE: `Invalid Credentials` });
      };
    })
    .catch(err => {
      res.status(500).json({ MESSAGE: 'Error Handling Login Request...', err });
    })

});

function generateToken(userData) {
  const payload = { userid: userData.id, username: userData.username };
  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, secret.jwtSecret, options);
  return token;
}

module.exports = router;
