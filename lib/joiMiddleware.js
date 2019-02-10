'use strict'

const Joi = require('joi')

const joiMiddleware = (schema, property) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema)
    if (error === null) {
      next()
    } else {
      const { details } = error
      const body = details.map(i => i.message).join(',')
      res.json(422, {
        message: 'Invalid request',
        error: body
      })
    }
  }
}

module.exports = joiMiddleware
