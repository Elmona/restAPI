'use strict'

const root = require('./root.js')
const getUsers = require('./getUsers.js')
const addUsers = require('./addUsers.js')
const login = require('./users/login.js')

const router = server => {
  server.get('/users', getUsers)
  server.post('/users', addUsers)
  server.post('/users/login', login)

  server.get('/', root)
}

module.exports = router
