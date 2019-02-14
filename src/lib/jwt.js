const fs = require('fs')
const jwt = require('jsonwebtoken')

const certPublic = fs.readFileSync('./cert/public_key.pem')
const certPrivate = fs.readFileSync('./cert/private_key.pem')

const verify = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, certPublic, (err, decoded) => {
      if (err) return reject(err)
      if (decoded) return resolve(decoded.user)
    })
  })
}

const sign = username => {
  return new Promise((resolve, reject) => {
    jwt.sign({
      issuer: 'Elmona',
      user: username
    }, certPrivate, { expiresIn: '2 hours' },
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
