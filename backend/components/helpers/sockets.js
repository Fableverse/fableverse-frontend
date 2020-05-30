const io = require('socket.io')()
const sqlconfig = require('./sqlconfig')
const connection = sqlconfig.connection
var namespaces = []

const connect = () => {
  connection.query('SELECT * FROM `servers`', function (
    error,
    servers,
    fields
  ) {
    if (error) throw error

    // Creates a namespace for the sockets of every server.
    for (let i = 0; i < servers.length; i++) {
      createNamespace(servers[i].id)
    }

    io.listen(8002)
  })
}

const createNamespace = id => {
  var ns = {
    //id: require('node-uuid')(),
    id: id,
    clients: 0
  }
  namespaces.push(ns)
  console.log('SocketIO: Namespace created on id ' + id)

  const nsp = io.of('/' + id)
  nsp.on('connection', function (socket) {
    ns.clients++
    console.log('SocketIO: User connected on ' + ns.id)
    nsp.emit('player count', ns.clients)

    socket.on('chat send', function (data) {
      const message = data.message
      const from = data.from

      const chat = {
        message: message,
        from: from
      }
      nsp.emit('chat recieve', chat)
    })

    socket.on('disconnect', function () {
      ns.clients--
      console.log('SocketIO: User disconnected on ' + ns.id)
      nsp.emit('player count', ns.clients)
    })
  })
}

module.exports = {
  createNamespace: createNamespace,
  connect: connect
}
