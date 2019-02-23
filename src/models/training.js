'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trainingSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: 'Username is required.'
  },
  type: {
    type: String,
    required: 'Type is required.'
  },
  length: {
    type: Number
  },
  startTime: {
    type: Date,
    required: 'startTime is required'
  },
  endTime: {
    type: Date,
    required: 'endTime is required'
  },
  comment: {
    type: String
  }
})

const User = mongoose.model('training', trainingSchema)

module.exports = User
