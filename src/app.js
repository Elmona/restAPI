'use strict'

const restify = require('restify')
const routes = require('./routes/router.js')
const mongoose = require('./config/mongoose')

const port = process.env.PORT | 8080

mongoose.run().catch(err => {
  console.log(err)
  process.exit(1)
})

const server = restify.createServer({
  name: 'API Training',
  version: '1.0.0'
})

server.use(restify.plugins.throttle({
  setHeaders: true,
  burst: 50,
  rate: 4,
  ip: true
}))

// TODO: Maybe change to only application/json
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser())

// Setting up all the routes
routes(server)

server.listen(port, () => console.log(`${server.name} is listening at ${server.url}`))
