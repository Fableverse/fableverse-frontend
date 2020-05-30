const ping = require('./routes/public/ping')
const user = require('./routes/public/user')
const server = require('./routes/private/server')

const routes = require('express').Router()

routes.use('/user', user)
routes.use('/ping', ping)
routes.use('/server', server)

module.exports = routes
