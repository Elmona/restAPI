'use strict'
const jwt = require('../../lib/jwt')

const login = (req, res, next) => {
  if (req.body.username === 'Elmona' && req.body.password === 'testar') {
    console.log('Succesful login')
    jwt.sign(req.body.username)
      .then(token => res.json(200, { token: token }))
  } else {
    console.log('Invalid username/password supplied')
    res.json(403, { message: 'Invalid username/password supplied' })
  }
}

module.exports = login
