'use strict'

const Joi = require('joi')

/**
 * joiMiddleware
 * Middleware to validate incoming json
 *
 * @param {Object} schema
 * @returns {Function}
 */
const joiMiddleware = schema => {
  return (req, res, next) => {
    try {
      if (req.body === undefined) {
        throw new Error('Body is empty')
      }
      console.log(req.body)

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
