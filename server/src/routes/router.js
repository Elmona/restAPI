'use strict'

const joiMiddleware = require('../lib/joiMiddleware')
const addUserSchema = require('../lib/addUserSchema')
const loginSchema = require('../lib/loginSchema')

const root = require('./root.js')
const getUsers = require('./users/getUsers.js')
const addUsers = require('./users/addUsers.js')
const login = require('./users/login.js')

const router = server => {
  server.post('/users', joiMiddleware(addUserSchema), addUsers)
  server.get('/users/:name', getUsers)
  server.post('/users/login', joiMiddleware(loginSchema), login)
  server.get('/', root)
}

module.exports = router
