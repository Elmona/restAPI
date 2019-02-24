'use strict'

const Joi = require('joi')

const addHooks = Joi.object().keys({
  url: Joi.string().uri().trim().required()
})

module.exports = addHooks
