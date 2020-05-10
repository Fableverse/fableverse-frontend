import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'

import Logo from '../../../../images/logotransparent-white.png'

import Loading from '../../../loading/loading'

import axios from 'axios'

const ip = 'http://localhost:8001/'

// let isLoading = true

function ServerPlay ({ setInGame }) {
  const [players, setPlayers] = useState(0)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    function setTime () {
      let week = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]

      let months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'November',
        'December'
      ]

      let myDate = new Date()
      let dayOfWeek = week[parseInt(myDate.getDay())]
      let month = months[myDate.getMonth()]
      let day = myDate.getDate()

      let seconds = myDate.getUTCSeconds()
      if (seconds < 10) {
        seconds = '0' + seconds
      }

      let time =
        myDate.getHours() + ':' + myDate.getUTCMinutes() + ':' + seconds

      setDate(dayOfWeek + ', ' + month + ' ' + day + ' | ' + time)
      setTimeout(setTime, 1000)
    }

    setInGame(true)

    axios.get(ip + 'server/' + id).then(data => {
      if (data.data.length === 1) {
        console.log(data.data[0])
        setTitle(data.data[0].server_name)

        const socket = io.connect('http://localhost:8002/' + id)
        socket.on('player count', function (data) {
          setPlayers(data)

          setIsLoading(false)
        })
      } else {
        console.log('SERVER DOES NOT EXISTS')
      }
    })

    setTime()

    // Gets rid of annoying error
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='row'>
          <div className='left-column'>
            <div
              className='header'
              style={{ width: '100%', paddingTop: '15px' }}
            >
              <img
                src={Logo}
                style={{
                  width: '50px',
                  display: 'block',
                  float: 'left',
                  marginTop: '6px'
                }}
                alt='a wizard hat with a feather in it'
              />
              <div
                style={{ marginLeft: '25px', display: 'block', float: 'left' }}
              >
                <h1 style={{ padding: 0, margin: 0, fontSize: '16px' }}>
                  {title}
                </h1>
                <h2 style={{ padding: 0, margin: 0, fontSize: '12px' }}>
                  <span style={{ color: '#BEA138' }}>Players Online:</span>{' '}
                  {players}
                </h2>
                <h2
                  style={{
                    padding: 0,
                    margin: 0,
                    fontSize: '12px',
                    fontWeight: '300'
                  }}
                >
                  {date}
                </h2>
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div
              style={{
                width: '330px',
                height: '300px',
                backgroundColor: '#191A1C'
              }}
            ></div>
            <a
              href='/servers/'
              style={{
                width: '100%',
                margin: '100px auto',
                display: 'block',
                textAlign: 'center'
              }}
            >
              Exit Game
            </a>
          </div>
          <div className='center-column'></div>
          <div className='right-column'></div>
        </div>
      )}
    </div>
  )
}

export default ServerPlay
