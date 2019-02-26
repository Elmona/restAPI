'use strict'

const Joi = require('joi')

/**
 * Validates URI
 *
 * @returns {Object}
 */
const addHooks = Joi.object().keys({
  url: Joi.string().uri().trim().required()
})

module.exports = addHooks
