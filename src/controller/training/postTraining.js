'use strict'

const Training = require('../../models/training.js')
const sendHooks = require('../../lib/sendHooks.js')

/**
 * postTraining
 * Add new Training
 *
 * @param {Object} req
 * @param {Object} res
 */
const postTraining = (req, res) => {
  const { body } = req
  body.username = req.jwtUsername

  new Training(body).save()
    .then(data => {
      res.json({
        message: 'Resource created',
        body: body
      })
      sendHooks()
    })
    .catch(err => {
      console.log(`Error: ${err}`)
      res.json(500, { Error: 'Unknown error' })
    })
}

module.exports = postTraining
