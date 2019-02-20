'use strict'

const jwt = require('../lib/jwt')

/**
 * authorizeMiddleware
 *
 * Check if correct JWT is sent in header.
 * If found and correct call next()
 * Else render Error
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const authorizeMiddleware = (req, res, next) => {
  const { authorization } = req.headers

  jwt.verify(authorization)
    .then(res => next())
    .catch(() => res.json(401, { Error: 'Invalid token' }))
}

module.exports = authorizeMiddleware
