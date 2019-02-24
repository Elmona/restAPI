'use strict'

const User = require('../../models/user.js')

/**
 * deleteUser
 * Delete post from database
 *
 * @param {Object} req
 * @param {Object} res
 */
const deleteTraining = (req, res) => {
  User.findOne({ username: req.jwtUsername })
    .then(data => {
      if (data.username !== req.jwtUsername) {
        res.json(403, {
          error: 'You dont have permision do delete this resource'
        })
      } else {
        User.deleteOne({ username: req.jwtUsername })
          .then(result => {
            res.json({
              message: 'User succesfully deleted'
            })
          })
      }
    })
    .catch(err => console.log(err))
}

module.exports = deleteTraining
