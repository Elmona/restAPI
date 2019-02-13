'use strict'

const Joi = require('joi')

const joiMiddleware = (schema, property) => {
  return (req, res, next) => {
    const { error } = Joi.validate(req.body, schema)
    if (error === null) {
      next()
    } else {
      res.json(422, {
        message: 'Error - Invalid request',
        error: error.message
      })
    }
  }
}

module.exports = joiMiddleware
