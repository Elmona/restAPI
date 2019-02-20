'use strict'

const fs = require('fs')
const jwt = require('jsonwebtoken')

const certPublic = fs.readFileSync('./cert/public_key.pem')
const certPrivate = fs.readFileSync('./cert/private_key.pem')

/**
 * Verify JWT
 * Resolve - decoded username
 * Reject - Error
 *
 * @param {String} token
 * @returns {Promise}
 */
const verify = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, certPublic, { algorithm: 'RS256' },
      (err, decoded) => {
        if (err) return reject(err)
        if (decoded) return resolve(decoded.user)
      })
  })
}

/**
 * Create an JWT with a cerfiticate
 * Resolve - Token
 * Reject - Error
 *
 * @param {String} username
 * @returns {Promise}
 */
const sign = username => {
  return new Promise((resolve, reject) => {
    jwt.sign({
      issuer: 'Elmona',
      user: username
    }, certPrivate, { expiresIn: '2 hours', algorithm: 'RS256' },
    (err, token) => {
      if (err) return reject(err)
      return resolve(token)
    })
  })
}

module.exports = {
  verify,
  sign
}
