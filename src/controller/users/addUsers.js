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
      const errCode = err.code === 11000 ? 409 : 500
      res.json(errCode, {
        message: 'Error',
        error: err.code === 11000 ? 'Username already taken' : 'Unknown error'
      })
    })
}

module.exports = addUsers
