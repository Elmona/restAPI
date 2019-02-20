'use strict'

/**
 * Render root directory as json.
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 */
const root = (req, res, next) => {
  res.json({
    title: 'RESTful API for saving your training exercises',
    dataLinks: {
      users: `https://${req.headers.host}/users`,
      login: `https://${req.headers.host}/users/login`,
      training: `https://${req.headers.host}/training`
    }
  })
}

module.exports = root
