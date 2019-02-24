'use strict'

const Training = require('../../models/training.js')

/**
 * training
 * Get training
 *
 * @param {Object} req
 * @param {Object} res
 */
const training = (req, res) => {
  Training.find({})
    .then(data => {
      res.json({
        data: data
      })
    }).catch(err => {
      console.log(`Error: ${err}`)
      res.json(500, { Error: 'Unknown error' })
    })
}

module.exports = training
