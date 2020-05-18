import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import Loading from '../../../loading/loading'

const ip = 'http://localhost:8001/'

function ServerCharacter () {
  let history = useHistory()

  const { id } = useParams()
  //   const [characters, setCharacters] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  function handleCreate () {
    const username = document.getElementById('username').value
    axios
      .post(ip + 'server/' + id + '/character', {
        username: username
      })
      .then(res => {
        console.log(res)
        window.location.href = '/servers/' + id
      })
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <center>
            <input
              type='text'
              id='username'
              name='username'
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  handleCreate()
                }
              }}
              placeholder='Character Name...'
            />
            <br />
            <button onClick={handleCreate}>Create</button>
          </center>
        </div>
      )}
    </div>
  )
}

export default ServerCharacter
