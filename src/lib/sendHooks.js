'use strict'

const crypto = require('crypto')
const fetch = require('node-fetch')
const Hooks = require('../models/hooks.js')

/**
 * sendHooks
 * Get all registered webhooks in database and send
 *
 * @param {Object} body
 */
const sendHooks = body => {
  console.log('Sending hooks')
  body.text = `${body.username} did ${body.Running}. Length was ${body.length}, startTime: ${body.startTime}, endTime: ${body.endTime} comment: ${body.comment}`

  Hooks.find({})
    .then(data => data.map(d =>
      fetch(d.url, {
        headers: {
          'Content-Type': 'application/json',
          'X-Hub-Signature': createComparisionSignature(body, d.key)
        },
        method: 'POST',
        body: JSON.stringify(body)
      })
    ))
    .then(p => Promise.all(p))
    .then(() => console.log('Done'), console.log)
}

/**
 * createComparisionSignature
 * Create signature with key and body
 *
 * @param {Object} body
 * @param {String} key
 * @returns {String}
 */
const createComparisionSignature = (body, key) => {
  const hmac = crypto.createHmac('sha1', key)
  const selfSignature = hmac.update(JSON.stringify(body)).digest('hex')
  return `sha1=${selfSignature}`
}

module.exports = sendHooks
