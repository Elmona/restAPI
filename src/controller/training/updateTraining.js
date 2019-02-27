'use strict'

const Training = require('../../models/training.js')

/**
 * updateTraining
 * Update existing Training
 *
 * @param {Object} req
 * @param {Object} res
 */
const updateTraining = (req, res) => {
  const { body } = req
  body.username = req.jwtUsername

  Training.findOne({ _id: body.id })
    .then(data => {
      if (data === null) {
        res.json(404, {
          error: 'Resource not found'
        })
      } else if (data.username !== req.jwtUsername) {
        res.json(403, {
          error: 'You dont have permision do delete this resource'
        })
      } else {
        return Training.updateOne(
          { _id: body.id },
          { $set: {
            type: body.type === undefined ? data.type : body.type,
            length: body.length === undefined ? data.length : body.length,
            startTime: body.startTime === undefined ? data.startTime : body.startTime,
            endTime: body.endTime === undefined ? data.endTime : body.endTime,
            comment: body.comment === undefined ? data.comment : body.comment
          } }, { upsert: true })
      }
    })
    .then(data => {
      console.log(data)
      res.json({
        message: 'Resource updated',
        body: body
      })
    })
    .catch(err => {
      console.log(`Error: ${err}`)
      res.json(500, { Error: 'Unknown error' })
    })
}

module.exports = updateTraining
