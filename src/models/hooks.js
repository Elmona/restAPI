'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hooksSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: 'Username is required.'
  },
  url: {
    type: String,
    required: 'URL is required.',
    unique: true
  },
  key: {
    type: String,
    required: 'Key is required'
  }
})

const Hooks = mongoose.model('hooks', hooksSchema)

module.exports = Hooks
