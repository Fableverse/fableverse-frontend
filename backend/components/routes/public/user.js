const routes = require('express').Router()
const sqlconfig = require('../../helpers/sqlconfig')
const connection = sqlconfig.connection
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwtExpirySeconds = 60 * 60 * 24 * 365
const jwt = require('jsonwebtoken')
const jwtKey = process.env.JWT_TOKEN_SECRET
const middleware = require('../../helpers/middleware')

routes.post('/register', (req, res) => {
  const { email, password } = req.body
  connection.query(
    'SELECT * FROM `accounts` WHERE `email` = ?',
    email,
    function (error, results, fields) {
      if (error) throw error
      if (results.length == 0) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            connection.query(
              'INSERT INTO `accounts` (`email`, `password`, `created_date`, `security_level`) VALUES (?, ?, ?, ?);',
              [email, hash, new Date(), 0],
              function (error, results, fields) {
                if (error) throw error
                res.status(200).end()
              }
            )
          })
        })
      } else {
        res.status(401).end()
      }
    }
  )
})

routes.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(401).end()
  }

  connection.query(
    'SELECT * FROM `accounts` WHERE `email` = ?',
    email,
    function (error, results, fields) {
      if (error) {
        res.status(401).end()
      } else {
        if (results.length == 0) {
          res.status(401).end()
        } else {
          const storedPassword = results[0].password
          bcrypt.compare(password, storedPassword, function (err, result) {
            if (result) {
              const token = jwt.sign({ email }, jwtKey, {
                algorithm: 'HS256',
                expiresIn: jwtExpirySeconds
              })
              connection.query(
                'UPDATE `accounts` SET `last_login` = ? WHERE `email` = ?;',
                [new Date(), email]
              )
              res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000 })
              res.end()
            } else {
              res.status(401).end()
            }
          })
        }
      }
    }
  )
})

routes.post('/changepassword', middleware, (req, res) => {
  const { email, password, newPassword } = req.body

  connection.query(
    'SELECT * FROM `accounts` WHERE `email` = ?',
    email,
    function (error, results, fields) {
      if (error) throw error
      const storedPassword = results[0].PASSWORD
      bcrypt.compare(password, storedPassword, function (err, result) {
        if (result) {
          // Update password to new password
          connection.query(
            'UPDATE `accounts` SET `password` = ? WHERE `email` = ?;',
            [newPassword, email],
            function (error, results, fields) {
              // Successfully updated!
              console.log('Updated Password!')
            }
          )
        } else {
          res.status(401).end()
        }
      })
    }
  )
})

routes.post('/validate', (req, res) => {
  const token = req.cookies.token

  // if the cookie is not set, return an unauthorized error
  if (!token) {
    return res.status(401).end()
  }

  let payload
  try {
    payload = jwt.verify(token, jwtKey)
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // Bad Token
      return res.status(401).end()
    }
    // Error
    return res.status(400).end()
  }

  connection.query(
    'UPDATE `accounts` SET `last_login` = ? WHERE `email` = ?;',
    [new Date(), payload.email]
  )

  // Variables to pass back to function
  res.status(200).end()
})

module.exports = routes
