'use strict'

const addUserSchema = require('../models/joi/addUserSchema')
const loginSchema = require('../models/joi/loginSchema')

const authorizeMiddleware = require('../middleware/authorizeMiddleware')
const joiMiddleware = require('../middleware/joiMiddleware')

const root = require('./root.js')
const getUsers = require('./users/getUsers.js')
const addUsers = require('./users/addUsers.js')
const login = require('./users/login.js')

/**
 * Main router
 *
 * @param {Object} server
 */
const router = server => {
  server.get('/', root)
  server.post('/users', joiMiddleware(addUserSchema), addUsers)
  server.post('/users/login', joiMiddleware(loginSchema), login)

  server.get('/users/:name', authorizeMiddleware, getUsers)
}

module.exports = router
