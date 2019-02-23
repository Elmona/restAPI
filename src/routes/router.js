'use strict'

const addUserSchema = require('../models/joi/addUserSchema')
const loginSchema = require('../models/joi/loginSchema')
const addTraining = require('../models/joi/addTraining')

const authorizeMiddleware = require('../middleware/authorizeMiddleware')
const joiMiddleware = require('../middleware/joiMiddleware')

const root = require('./root.js')

const getUsers = require('./users/getUsers.js')
const addUsers = require('./users/addUsers.js')
const login = require('./users/login.js')

const getTraining = require('./training/getTraining.js')
const postTraining = require('./training/postTraining.js')

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

  server.get('/training/:id', authorizeMiddleware, getTraining)
  server.post('/training', authorizeMiddleware, joiMiddleware(addTraining), postTraining)
}

module.exports = router
