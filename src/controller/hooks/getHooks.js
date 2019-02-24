'use strict'

const Hooks = require('../../models/hooks.js')

/**
 * Get registered Hooks
 *
 * @param {Object} req
 * @param {Object} res
 */
const getHooks = (req, res) => {
  Hooks.find({ username: req.jwtUsername })
    .then(data => {
      res.json({
        data: data
      })
    }).catch(err => {
      console.log(`Error: ${err}`)
      res.json(500, {
        message: 'Error',
        error: 'Unknown error'
      })
    })
}

module.exports = getHooks
