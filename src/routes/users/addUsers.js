'use strict'

const User = require('../../models/user.js')

const addUsers = (req, res, next) => {
  const { body } = req

  new User(body).save()
    .then(msg => {
      res.json({
        message: 'Resource created',
        data: body
      })
    }).catch(err => {
      res.json({
        message: 'Error',
        error: err.code === 11000 ? 'Username already taken' : 'Unknown error'
      })
    })
}

module.exports = addUsers
