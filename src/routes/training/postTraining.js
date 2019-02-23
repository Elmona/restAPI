'use strict'

const Training = require('../../models/training.js')

/**
 * postTraining
 * Add new Training
 *
 * @param {Object} req
 * @param {Object} res
 */
const postTraining = (req, res) => {
  const { body } = req

  new Training(body).save()
    .then(data => {
      res.json({
        message: 'Resource created',
        body: body
      })
    })
    .catch(err => {
      console.log(`Error: ${err}`)
      res.json(500, { Error: 'Unknown error' })
    })
}

module.exports = postTraining
