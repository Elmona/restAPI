'use strict'

const Training = require('../../models/training.js')

/**
 * training
 * Get training
 *
 * @param {Object} req
 * @param {Object} res
 */
const training = (req, res) => {
  let { offset, start } = req.query

  offset = parse(offset, 20)
  start = parse(start, 0)

  Training.find({}).sort('-date').skip(start).limit(offset)
    .then(data => {
      res.json({
        data: data.length === 0 ? 'Could not find any data change start/offset value' : data,
        nextURL: `https://${req.headers.host}/training?start=${start + offset}&offset=20`
      })
    }).catch(err => {
      console.log(`Error: ${err}`)
      res.json(500, { Error: 'Unknown error' })
    })
}

/**
 * parse
 * Parsing query parameters if invalid return standard values
 *
 * @param {Number} value
 * @param {Number} standard
 * @returns {Number}
 */
const parse = (value, standard) => {
  if (value === undefined) {
    return standard
  }

  value = parseInt(value, 10)

  if (isNaN(value)) {
    return standard
  }
  return value
}

module.exports = training
