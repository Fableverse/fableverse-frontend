import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'

function ServerPlay ({ setInGame }) {
  const [socket, setSocket] = useState()
  const { id } = useParams()

  useEffect(() => {
    setInGame(true)
    console.log(setInGame)
    setSocket(io('http://localhost:8002/' + id))
  }, [id, setInGame])

  return (
    <div>
      <a href='/servers/'>Exit Game</a>
    </div>
  )
}

export default ServerPlay
