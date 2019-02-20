'use strict'

const joiMiddleware = require('../lib/joiMiddleware')
const addUserSchema = require('../lib/addUserSchema')
const loginSchema = require('../lib/loginSchema')
const authorizeMiddleware = require('../lib/authorizeMiddleware')

const root = require('./root.js')
const getUsers = require('./users/getUsers.js')
const addUsers = require('./users/addUsers.js')
const login = require('./users/login.js')

/**
 * Main router
 *
 * @param {object} server
 */
const router = server => {
  server.get('/', root)
  server.post('/users', joiMiddleware(addUserSchema), addUsers)
  server.post('/users/login', joiMiddleware(loginSchema), login)

  server.get('/users/:name', authorizeMiddleware, getUsers)
}

module.exports = router
