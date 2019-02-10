'use strict'

const addUsers = (req, res, next) => {
  const { body } = req

  res.json({
    message: 'Resource created',
    data: body
  })
}

module.exports = addUsers
