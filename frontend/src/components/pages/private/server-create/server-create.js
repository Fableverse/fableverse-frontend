import React from 'react'
import axios from 'axios'

const ip = 'http://localhost:8001/'

function ServerCreate () {
  function handleCreate () {
    const serverName = document.getElementById('serverName').value
    const serverDescription = document.getElementById('serverDescription').value

    axios
      .post(ip + 'server/create', {
        serverName: serverName,
        description: serverDescription
      })
      .then(res => {
        console.log(res.status)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div>
      <center>
        <h1>Create a Server</h1>
        <div>
          <input
            type='text'
            id='serverName'
            name='serverName'
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleCreate()
              }
            }}
            placeholder='Server Name...'
          />
          <input
            type='text'
            id='serverDescription'
            name='serverDescription'
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleCreate()
              }
            }}
            placeholder='Server Description...'
          />
          <button onClick={handleCreate}>Create</button>
        </div>
      </center>
    </div>
  )
}

export default ServerCreate
