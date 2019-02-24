'use strict'

const Hooks = require('../../models/hooks.js')

/**
 * deleteHooks
 * Delete post from database
 *
 * @param {Object} req
 * @param {Object} res
 */
const deleteHooks = (req, res) => {
  const { body } = req

  Hooks.findOne({ _id: body.id })
    .then(data => {
      if (data === null) {
        res.json(404, {
          Error: 'Resource not found'
        })
      } else if (data.username !== req.jwtUsername) {
        res.json(403, {
          Error: 'You dont have permision do delete this resource'
        })
      } else {
        Hooks.deleteOne({ _id: body.id })
          .then(result => {
            res.json({
              message: 'Resource succesfully deleted'
            })
          })
      }
    })
    .catch(err => console.log(err))
}

module.exports = deleteHooks
