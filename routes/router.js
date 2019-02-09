'use strict'

const root = require('./root.js')
const users = require('./users.js')

const router = server => {
	server.get('/users', users)
	server.get('/', root)
}

module.exports = router

