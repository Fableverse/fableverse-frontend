import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Loading from '../../../loading/loading'

const ip = process.env.REACT_APP_API_IP

function ServerCreate () {
  const [servers, setServers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    function refresh () {
      axios.get(ip + 'server/').then(data => {
        console.log('Updated!')
        setServers(data.data)
        setIsLoading(false)
        // setTimeout(refresh, 5000)
      })
    }
    refresh()
  }, [])

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <center>
            <h1 style={{ margin: 0, padding: 0 }}>Server List</h1>
            <button
              onClick={() => {
                window.location.reload()
              }}
            >
              Refresh
            </button>
          </center>
          <table style={{ width: '100%' }}>
            <tbody>
              <tr style={{ textAlign: 'left' }}>
                <th>Owner ID</th>
                <th>Server ID</th>
                <th>Server Name</th>
                <th>Server Description</th>
                <th>Server Status</th>
                <th>Actions</th>
              </tr>

              {servers.map((server, i) => {
                const {
                  account_id,
                  id,
                  server_name,
                  description,
                  status
                } = server
                return (
                  <tr key={i}>
                    <td>{account_id}</td>
                    <td>{id}</td>
                    <td>{server_name}</td>
                    <td>{description}</td>
                    <td>{status}</td>
                    <td>
                      <Link to={'/servers/' + id}>
                        <button>Join</button>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ServerCreate
