'use strict'

const jwt = require('../../lib/jwt')
const User = require('../../models/user.js')

/**
 * login
 * Check username in database
 * If correct create and send JWT
 * else respond with 403.
 *
 * @param {Object} req
 * @param {Object} res
 */
const login = (req, res) => {
  const { username, password } = req.body

  User.findOne({ username: username })
    .then(user => user.comparePassword(password))
    .then(match => {
      if (match === false) throw new Error()

      return jwt.sign(req.body.username)
    }).then(token => res.json(200, { token: token }))
    .catch(e => res.json(401, { error: 'Unauthorized' }))
}

module.exports = login
