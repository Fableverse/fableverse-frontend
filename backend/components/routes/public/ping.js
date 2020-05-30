const routes = require('express').Router()

routes.get('/', (req, res) => {
  res.json({
    status: 'pong'
  })
})

module.exports = routes
