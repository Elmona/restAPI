'use strict'

// const Training = require('../../models/training.js')

const postTraining = (req, res, next) => {
  const { body } = req

  console.log(body)
  res.json('hmm')
}

module.exports = postTraining
