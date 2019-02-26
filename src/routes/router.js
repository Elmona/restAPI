'use strict'

const addUserSchemaJOI = require('../models/joi/addUserSchema')
const loginSchemaJOI = require('../models/joi/loginSchema')
const addTrainingJOI = require('../models/joi/addTraining')
const mongoidJOI = require('../models/joi/mongoid')
const addHooksJOI = require('../models/joi/addHooks')

const authorizeMiddleware = require('../middleware/authorizeMiddleware')
const joiMiddleware = require('../middleware/joiMiddleware')

const root = require('../controller/root.js')

const getUsers = require('../controller/users/getUsers.js')
const addUsers = require('../controller/users/addUsers.js')
const deleteUsers = require('../controller/users/deleteUsers.js')
const login = require('../controller/users/login.js')

const getTraining = require('../controller/training/getTraining.js')
const postTraining = require('../controller/training/postTraining.js')
const deleteTraining = require('../controller/training/deleteTraining.js')

const getHooks = require('../controller/hooks/getHooks.js')
const addHooks = require('../controller/hooks/addHooks.js')
const deleteHooks = require('../controller/hooks/deleteHooks.js')

/**
 * Main router
 *
 * @param {Object} server
 */
const router = server => {
  server.get('/', root)

  server.post('/users', joiMiddleware(addUserSchemaJOI), addUsers)
  server.post('/users/login', joiMiddleware(loginSchemaJOI), login)
  server.get('/users', authorizeMiddleware, getUsers)
  server.del('/users', authorizeMiddleware, deleteUsers)

  server.post('/training', authorizeMiddleware, joiMiddleware(addTrainingJOI), postTraining)
  server.get('/training', authorizeMiddleware, getTraining)
  server.del('/training', authorizeMiddleware, joiMiddleware(mongoidJOI), deleteTraining)

  server.get('/hooks', authorizeMiddleware, getHooks)
  server.post('/hooks', authorizeMiddleware, joiMiddleware(addHooksJOI), addHooks)
  server.del('/hooks', authorizeMiddleware, joiMiddleware(mongoidJOI), deleteHooks)
}

module.exports = router
