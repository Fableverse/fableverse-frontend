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
          onEnter()
        })
      } else {
        console.log('SERVER DOES NOT EXISTS')
      }
    })

    setTime()

    // Gets rid of annoying error
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleCommand () {
    const container = document.getElementById('gametext')
    const command = document.getElementById('gameinput').value
    document.getElementById('gameinput').value = ''

    if (command !== '') {
      if (command.charAt(0) === '/') {
        const tokens = command.split(' ')

        const reply = document.createElement('li')
        let nameOfCommand = tokens[0].split('/')
        reply.innerHTML = 'Command: ' + nameOfCommand[1]
        reply.setAttribute('style', 'color:gray;padding:10px 0px')
        container.appendChild(reply)
        updateScroll()
      } else {
        const reply = document.createElement('li')
        reply.setAttribute('style', 'padding:3px 0px')
        const span1 = document.createElement('span')
        span1.setAttribute('style', 'color:lightblue;')
        span1.innerHTML = '[Player]: '
        const span2 = document.createElement('span')
        span2.innerHTML = command
        reply.appendChild(span1)
        reply.appendChild(span2)
        container.appendChild(reply)
        updateScroll()
      }
    }
  }

  function onEnter () {
    const levelName = 'The Zone'
    const levelDescription =
      'Welcome to the zone. Many good things are on this level. So many cool things to see and do. I am trying to fill up as much space on this field as possible. Is this working now?'
    const container = document.getElementById('gametext')
    const levelNameHeader = document.createElement('h4')
    const span1 = document.createElement('span')
    const span2 = document.createElement('span')

    levelNameHeader.setAttribute('style', 'padding:10px 0 0 0;margin: 0')
    span1.setAttribute('style', 'color:white')
    span1.innerHTML = 'Entering: '
    span2.setAttribute('style', 'color:#BEA138;')
    span2.innerHTML = 'The Zone'
    levelNameHeader.appendChild(span1)
    levelNameHeader.appendChild(span2)
    container.appendChild(levelNameHeader)

    const levelDescriptionHeader = document.createElement('li')
    levelDescriptionHeader.innerHTML = levelDescription
    levelDescriptionHeader.setAttribute('style', 'padding: 10px 0; margin: 0')
    container.appendChild(levelDescriptionHeader)

    updateScroll()
  }

  function updateScroll () {
    var element = document.getElementById('gametextdiv')
    element.scrollTop = element.scrollHeight
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='row'>
          <div className='left-column'>
            <center>
              <div
                className='header'
                style={{
                  width: '100%',
                  paddingTop: '15px'
                }}
              >
                <img
                  src={Logo}
                  style={{
                    width: '50px',
                    display: 'block',
                    // float: 'left',
                    marginBottom: '16px'
                  }}
                  alt='a wizard hat with a feather in it'
                />
                <div
                  style={{
                    marginLeft: '10px',
                    display: 'block'
                    // float: 'left'
                  }}
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
            </center>
            <br />

            <center>
              <div
                style={{
                  width: '250px',
                  height: '250px',
                  backgroundColor: '#191A1C'
                }}
              />
            </center>
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
          <div className='center-column'>
            <div
              id='gametextdiv'
              style={{
                width: '100%',
                height: '95vh',
                bottom: '0',
                overflow: 'auto'
              }}
            >
              <ul
                id='gametext'
                className='gametext'
                style={{
                  boxSizing: 'border-box',
                  display: 'block',
                  bottom: '0',
                  width: '100%',
                  margin: 0,
                  padding: '30px 30px',
                  listStyle: 'none'
                }}
              />
            </div>
            <center>
              <input
                className='gameinput'
                id='gameinput'
                type='text'
                placeholder='Type a command here...'
                autoFocus={true}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    handleCommand()
                  }
                }}
              />
            </center>
          </div>
          <div className='right-column'></div>
        </div>
      )}
    </div>
  )
}

export default ServerPlay
