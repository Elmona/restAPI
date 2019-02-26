'use strict'

const Joi = require('joi')

/**
 * Validates loginSchema
 *
 * @returns {Object}
 */
const loginSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).max(200).required()
})

module.exports = loginSchema
