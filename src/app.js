'use strict'

const restify = require('restify')
const routes = require('./routes/router.js')
const mongoose = require('./config/mongoose')

const port = process.env.PORT | 8080

// Open connection to database
mongoose.run().catch(err => {
  console.log(err)
  process.exit(1)
})

// Create server
const server = restify.createServer({
  name: 'API Training',
  version: '1.0.0'
})

// Set restrictions to 4 connections/second per ip.
// setHeaders is to show the client information in header.
server.use(restify.plugins.throttle({
  setHeaders: true,
  burst: 50,
  rate: 4,
  ip: true
}))

// Middleware for parsing body and query
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser())

// Setting up all the routes
routes(server)

// Starting the server
server.listen(port, () => console.log(`${server.name} is listening at ${server.url}`))
