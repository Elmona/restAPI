const jwt = require('jsonwebtoken')

const secret = process.env.JWT_SECRET

const verify = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err)
      if (decoded) return resolve(decoded.user)
    })
  })
}

const sign = username => {
  return new Promise((resolve, reject) => {
    jwt.sign({
      user: username
    }, secret, { expiresIn: '2 hours' },
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
