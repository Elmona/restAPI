'use strict'

const Joi = require('joi')

const deleteTraining = Joi.object().keys({
  id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().error(new Error('id: Not an valid objectid'))
})

module.exports = deleteTraining
