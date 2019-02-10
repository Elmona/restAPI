'use strict'

const Joi = require('joi')

const addUserSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(6).max(200).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required()
})

module.exports = addUserSchema
