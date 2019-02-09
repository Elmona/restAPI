'use strict'

const restify = require('restify')
const server = restify.createServer()

server.get('/test', (req, res, next) => {
	res.send('Hello world!')
	next()
})

server.listen(8080, () => console.log(`${server.name} is listening at ${server.url}`))
