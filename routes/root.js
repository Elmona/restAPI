'use strict'

const root = (req, res, next) => {
  res.json({
    title: 'RESTful API for saving your exercises',
    dataLinks: {
      users: `https://${req.headers.host}/users`,
      blaha: `https://${req.headers.host}/blaha`
    }
  })
}

module.exports = root
