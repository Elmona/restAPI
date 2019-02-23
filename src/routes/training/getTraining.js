'use strict'

const User = require('../../models/user.js')

/**
 * users
 * Get user
 *
 * @param req
 * @param res
 */
const users = (req, res) => {
  User.findOne({ username: req.params.name })
    .then(user => {
      if (user.username === req.jwtUsername) {
        res.json({
          username: user.username,
          email: user.email,
          date: user.date
        })
      } else {
        throw new Error()
      }
    }).catch(e => {
      console.log(`Error: Forbidden}`)
      res.json(403, { Error: 'Forbidden' })
    })
}

module.exports = users
