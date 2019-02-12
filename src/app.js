'use strict'

const restify = require('restify')
const routes = require('./routes/router.js')
const mongoose = require('./config/mongoose')

console.log(process.env.MONGODB_URI)
const port = process.env.PORT | 8080

mongoose.run().catch(err => {
  console.log(err)
  // process.exit(1)
})

const server = restify.createServer({
  name: 'API Training',
  version: '1.0.0'
})

server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser())

routes(server)

server.listen(port, () => console.log(`${server.name} is listening at ${server.url}`))
