'use strict'

const Joi = require('joi')

/**
 * Validates updateTraining
 *
 * @returns {Object}
 */
const updateTraining = Joi.object().keys({
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('id: Not an valid objectid')),
  type: Joi.string().min(2).max(200),
  length: Joi.number().min(2).max(9000000),
  startTime: Joi.date(),
  endTime: Joi.date(),
  comment: Joi.string().min(2).max(200)
})

module.exports = updateTraining
