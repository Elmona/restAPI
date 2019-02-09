'use strict'

const root = (req, res, next) => {
	res.json({
		title: 'RESTful API for saving your exercises',
		dataLinks:{
			users: `https://${req.headers.host}/users`
		}
	})
}

module.exports = root
