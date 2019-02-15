'use strict'

const users = (req, res, next) => {
  res.json({
    title: 'Get user',
    user: req.params.name
  })
}

module.exports = users
