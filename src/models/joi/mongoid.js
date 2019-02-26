'use strict'

const Joi = require('joi')

/**
 * Validate that you have mongoid as id
 *
 * @returns {Object}
 */
const mongoid = Joi.object().keys({
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('id: Not an valid objectid'))
})

module.exports = mongoid
