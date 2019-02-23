'use strict'

const Joi = require('joi')

const addTraining = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30).required(),
  type: Joi.string().min(2).max(200).required(),
  length: Joi.number().min(2).max(9000000).required(),
  startTime: Joi.date().required(),
  endTime: Joi.date().required(),
  comment: Joi.string().min(2).max(200).required()
})

module.exports = addTraining
