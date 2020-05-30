const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const routes = require('./components/routes.js')
const sqlconfig = require('./components/helpers/sqlconfig')
const sockets = require('./components/helpers/sockets')
const app = express()

dotenv.config()

const origin = process.env.ORIGIN

app.use(cors({ credentials: true, origin: origin }))
app.use(bodyParser.json())
app.use(cookieParser())

sqlconfig.connect()
sockets.connect()

app.use('/', routes)

app.listen(8001, () => {
  console.log('Server running on port: 8001')
})
