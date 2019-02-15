'use strict'

const Joi = require('joi')

const joiMiddleware = (schema, property) => {
  return (req, res, next) => {
    try {
      if (req.body === undefined) {
        throw new Error('Body is empty')
      }

      const { error } = Joi.validate(req.body, schema)
      if (error === null) {
        next()
      } else {
        throw new Error(error.message)
      }
    } catch (e) {
      res.json(422, {
        message: 'Error - Invalid request',
        error: e.message
      })
    }
  }
}

module.exports = joiMiddleware
