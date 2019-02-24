'use strict'

const crypto = require('crypto')
const fetch = require('node-fetch')
const Hooks = require('../../models/hooks.js')

/**
 * postHooks
 * Add new Webhook
 *
 * @param {Object} req
 * @param {Object} res
 */
const postHooks = (req, res) => {
  const { body } = req

  body.username = req.jwtUsername
  body.key = crypto.randomBytes(32).toString('hex')

  fetch(body.url).then(data => {
    new Hooks(body).save()
      .then(data => {
        res.json({
          message: 'Webhook created - Make sure you save your key to confirm my hooks',
          body: body
        })
      })
      .catch(err => {
        console.log(`Error: ${err}`)
        const errCode = err.code === 11000 ? 409 : 500

        res.json(errCode, {
          message: 'Error',
          error: err.code === 11000 ? 'URI already registered' : 'Unknown error'
        })
      })
  }).catch(err => {
    console.log(err.message)
    res.json(400, { Error: 'URI did not respond' })
  })
}

module.exports = postHooks
