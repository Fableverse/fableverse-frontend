const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv')
const mysql = require('mysql')

const fs = require('fs')
const http = require('http')
const https = require('https')
const privateKey = fs.readFileSync(
  '/etc/letsencrypt/live/fableverse.com/privkey.pem',
  'utf8'
)
const certificate = fs.readFileSync(
  '/etc/letsencrypt/live/fableverse.com/cert.pem',
  'utf8'
)

var credentials = { key: privateKey, cert: certificate }

const app = express()

app.use(cors())
app.use(bodyParser.json())
dotenv.config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
})

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }

  console.log('connected as id ' + connection.threadId)
})

app.post('/signup', (req, res) => {
  connection.query(
    'INSERT INTO `beta_signups` (`datetime`, `email`) VALUES (?, ?);',
    [new Date(), req.body.email],
    function (error, results, fields) {
      if (error) throw error
      res.status(200).end()
    }
  )
})

app.post('/hit', (req, res) => {
  connection.query(
    'INSERT INTO `website_hits` (`datetime`, `ip`) VALUES (?, ?);',
    [new Date(), req.ip],
    function (error, results, fields) {
      if (error) throw error
      res.status(200).end()
    }
  )
})

var httpsServer = https.createServer(credentials, app)
httpsServer.listen(8000)
// app.listen(8000, () => {
//   console.log('Server running on port: 8001')
// })
