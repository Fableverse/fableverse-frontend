import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'

import Logo from '../../../../images/logotransparent-white.png'

function ServerPlay ({ setInGame }) {
  const [players, setPlayers] = useState(0)
  const [date, setDate] = useState()
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
      let time =
        myDate.getHours() +
        ':' +
        myDate.getUTCMinutes() +
        ':' +
        myDate.getUTCSeconds()
      setDate(dayOfWeek + ', ' + month + ' ' + day + ' | ' + time)
      setTimeout(setTime, 1000)
    }
    console.log('Ok')
    setInGame(true)

    const socket = io.connect('http://localhost:8002/' + id)
    socket.on('player count', function (data) {
      setPlayers(data)
    })

    setTime()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className='row'>
        <div className='left-column'>
          <div
            className='header'
            style={{ padding: '5px 15px', width: '100%' }}
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
                The Dead Rise Online
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
        </div>
        <div className='center-column'></div>
        <div className='right-column'></div>
      </div>
      {/* <a href='/servers/'>Exit Game</a> */}
    </div>
  )
}

export default ServerPlay
