'use strict'

const User = require('../../models/user.js')

const users = (req, res) => {
  res.json({
    title: 'Get user',
    user: req.params.name
  })
}

module.exports = users
