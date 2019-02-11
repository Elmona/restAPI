'use strict'

const users = (req, res, next) => {
  // Should check user
  res.json({
    title: 'Get user',
    user: req.params.name
  })
}

module.exports = users
