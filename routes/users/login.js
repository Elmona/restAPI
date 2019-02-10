'use strict'
const jwt = require('../../lib/jwt')

const login = (req, res, next) => {
  console.log(req.body)
  if (req.body.username === 'Elmona' && req.body.password === 'test') {
    console.log('Succesful login')
    jwt.sign(req.body.username)
      .then(token => res.json(200, token))
  } else {
    console.log('Invalid username/password supplied')
    res.json(403, 'Invalid username/password supplied')
  }
}

module.exports = login
