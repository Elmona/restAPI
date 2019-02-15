'use strict'

const joiMiddleware = require('../lib/joiMiddleware')
const addUserSchema = require('../lib/addUserSchema')
const loginSchema = require('../lib/loginSchema')
const jwt = require('../lib/jwt')

const root = require('./root.js')
const getUsers = require('./users/getUsers.js')
const addUsers = require('./users/addUsers.js')
const login = require('./users/login.js')

const authorizeMiddleware = (req, res, next) => {
  const { authorization } = req.headers

  jwt.verify(authorization)
    .then(res => next())
    .catch(() => res.json(401, { Error: 'Invalid token' }))
}

const router = server => {
  server.get('/', root)
  server.post('/users', joiMiddleware(addUserSchema), addUsers)
  server.post('/users/login', joiMiddleware(loginSchema), login)

  server.get('/users/:name', authorizeMiddleware, getUsers)
}

module.exports = router
