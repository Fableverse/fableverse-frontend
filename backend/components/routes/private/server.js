const routes = require('express').Router()
const middleware = require('../../helpers/middleware')
const sqlconfig = require('../../helpers/sqlconfig')
const sockets = require('../../helpers/sockets')
const connection = sqlconfig.connection

routes.post('/create', middleware, (req, res) => {
  const { serverName, description } = req.body
  const email = res.locals.email

  connection.query(
    'SELECT * FROM `accounts` WHERE `email` = ?',
    [email],
    function (error, results, fields) {
      if (error) throw error
      if (results.length == 1) {
        const accountId = results[0].id

        connection.query(
          'INSERT INTO `servers` (`account_id`, `server_name`, `description`, `status`) VALUES (?, ?, ?, ?);',
          [accountId, serverName, description, 0],
          function (error, results, fields) {
            if (error) throw error

            connection.query(
              'SELECT * FROM `servers` WHERE `account_id` = ? AND `server_name` = ?',
              [accountId, serverName],
              function (error, results, fields) {
                if (error) throw error
                sockets.createNamespace(results[0].id)
              }
            )

            res.status(200).end()
          }
        )
      } else {
        res.status(401).end()
      }
    }
  )
})

routes.get('/', middleware, (req, res) => {
  connection.query('SELECT * FROM `servers`', function (
    error,
    results,
    fields
  ) {
    if (error) throw error
    res.send(results)
  })
})

routes.get('/:id', middleware, (req, res) => {
  connection.query(
    'SELECT * FROM `servers` WHERE id = ?',
    req.params.id,
    function (error, results, fields) {
      if (error) throw error
      res.send(results)
    }
  )
})

routes.get('/:serverid/character', middleware, (req, res) => {
  const email = res.locals.email
  const serverId = req.params.serverid

  connection.query(
    'SELECT * FROM `accounts` WHERE `email` = ?',
    [email],
    function (error, results, fields) {
      if (error) throw error
      if (results.length == 1) {
        const accountId = results[0].id

        connection.query(
          'SELECT * FROM characters WHERE account_id = ? AND servers_id = ?;',
          [accountId, serverId],
          function (error, results, fields) {
            if (error) throw error
            res.send(results)
          }
        )
      }
    }
  )
})

routes.post('/:serverid/character', middleware, (req, res) => {
  const email = res.locals.email
  const serverId = req.params.serverid
  const username = req.body.username

  connection.query(
    'SELECT * FROM `accounts` WHERE `email` = ?',
    [email],
    function (error, results, fields) {
      if (error) throw error
      if (results.length == 1) {
        const accountId = results[0].id

        connection.query(
          'INSERT INTO `characters` (`account_id`, `servers_id`, `username`, `created_date`) VALUES (?, ?, ?, ?);',
          [accountId, serverId, username, new Date()],
          function (error, results, fields) {
            if (error) throw error
            res.status(200).end()
          }
        )
      }
    }
  )
})

module.exports = routes
