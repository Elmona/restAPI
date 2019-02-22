'use strict'

const jwt = require('../lib/jwt')

/**
 * authorizeMiddleware
 *
 * Check if correct JWT is sent in header.
 * If found and correct call next()
 * Else render Error
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
const authorizeMiddleware = (req, res, next) => {
  let { authorization } = req.headers

  authorization = authorization.replace('Bearer ', '')
  authorization = authorization.replace('JWT ', '')

  jwt.verify(authorization)
    .then(name => {
      req.jwtUsername = name
      next()
    })
    .catch(e => {
      console.log(`Error: ${e.message}`)
      res.json(401, { Error: 'Invalid token' })
    })
}

module.exports = authorizeMiddleware
