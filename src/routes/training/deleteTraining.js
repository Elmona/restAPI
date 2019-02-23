'use strict'

const Training = require('../../models/training.js')

/**
 * deleteTraining
 * Delete post from database
 *
 * @param {Object} req
 * @param {Object} res
 */
const deleteTraining = (req, res) => {
  const { body } = req

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
        Training.deleteOne({ _id: body.id })
          .then(result => {
            res.json({
              message: 'Resource succesfully deleted'
            })
          })
      }
    })
    .catch(err => console.log(err))
}

module.exports = deleteTraining
