'use strict'

const restify = require('restify')
const routes = require('./routes/router.js')
const port = 8080

const server = restify.createServer({
  name: 'API Training',
  version: '1.0.0'
})

routes(server)

server.listen(port, () => console.log(`${server.name} is listening at ${server.url}`))
