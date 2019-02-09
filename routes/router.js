'use strict'

const root = require('./root.js')
const getUsers = require('./getUsers')
const addUsers = require('./addUsers')

const router = server => {
  server.get('/users', getUsers)
  server.post('/users', addUsers)

  server.get('/', root)
}

module.exports = router
