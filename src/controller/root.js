'use strict'

/**
 * Render root directory as json.
 *
 * @param {object} req
 * @param {object} res
 */
const root = (req, res) => {
  res.json({
    meta: {
      title: 'RESTful API for saving your training exercises',
      license: 'MIT',
      author: 'Emil Larsson',
      desc: 'JWT for authentication, login save your token. Set token in header as authorization'
    },
    links: {
      self: {
        href: `https://${req.headers.host}/`,
        method: 'GET',
        desc: 'Root: This url'
      },
      users: {
        register: {
          href: `https://${req.headers.host}/users`,
          method: 'POST',
          desc: 'Register user: username, password, email in body as JSON'
        },
        login: {
          href: `https://${req.headers.host}/users/login`,
          method: 'POST',
          desc: 'Login: username, password in body as JSON'
        },
        view: {
          href: `https://${req.headers.host}/users`,
          method: 'GET',
          authentication: 'true',
          desc: 'View registered user'
        },
        delete: {
          href: `https://${req.headers.host}/users`,
          method: 'DELETE',
          authentication: 'true',
          desc: 'Delete user'
        }
      },
      training: {
        view: {
          href: `https://${req.headers.host}/training`,
          method: 'GET',
          authentication: 'true',
          desc: 'Get training'
        },
        add: {
          href: `https://${req.headers.host}/training`,
          method: 'POST',
          authentication: 'true',
          desc: 'Add training: type, length, startTime, endTime, comment in body as JSON'
        },
        delete: {
          href: `https://${req.headers.host}/training`,
          method: 'DELETE',
          authentication: 'true',
          desc: 'Delete training: id in body as JSON'
        }
      },
      hooks: {
        view: {
          href: `https://${req.headers.host}/hooks`,
          method: 'GET',
          authentication: 'true',
          desc: 'Get registered hooks'
        },
        add: {
          href: `https://${req.headers.host}/hooks`,
          method: 'POST',
          authentication: 'true',
          desc: 'Add hook: url in body as JSON'
        },
        delete: {
          href: `https://${req.headers.host}/hooks`,
          method: 'DELETE',
          authentication: 'true',
          desc: 'Delete hook: id in body as JSON'
        }
      }
    }
  })
}

module.exports = root
