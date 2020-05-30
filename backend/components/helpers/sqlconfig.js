const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config()

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
})

const connect = () => {
  connection.connect(function (err) {
    if (err) {
      console.error('error connecting: ' + err.stack)
      return
    }

    console.log('MySQL connected as id ' + connection.threadId)
  })
}

module.exports = {
  connection: connection,
  connect: connect
}
