'use strict'

const root = (req, res, next) => {
  res.json({
    title: 'RESTful API for saving your training exercises',
    dataLinks: {
      users: `https://${req.headers.host}/users`,
      login: `https://${req.headers.host}/users/login`,
      blaha: `https://${req.headers.host}/blaha`
    }
  })
}

module.exports = root
