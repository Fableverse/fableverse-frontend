import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'

import Logo from '../../../../images/logotransparent-white.png'

import Loading from '../../../loading/loading'
import ServerCharacter from '../server-character/server-character'

import axios from 'axios'

const ip = process.env.REACT_APP_API_IP
const socketip = process.env.REACT_APP_SOCKET_IP

// let isLoading = true

function ServerPlay ({ setInGame }) {
  const [players, setPlayers] = useState(0)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [createCharacter, setCreateCharacter] = useState(false)
  const [character, setCharacter] = useState(null)
  const [socket, setSocket] = useState(null)
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

      let minutes = myDate.getUTCMinutes()
      if (minutes < 10) {
        minutes = '0' + minutes
      }

      let hours = myDate.getHours()
      let dayOrNight
      if (hours < 12) {
        dayOrNight = 'AM'
      } else {
        if (hours !== 12) {
          hours = hours - 12
        }

        dayOrNight = 'PM'
      }

      let time = hours + ':' + minutes + ':' + seconds + dayOrNight

      setDate(dayOfWeek + ', ' + month + ' ' + day + ' (' + time + ')')
      setTimeout(setTime, 1000)
    }
    axios.get(ip + 'server/' + id + '/character').then(data => {
      console.log(data.data)
      if (data.data.length != 0) {
        setCharacter(data.data[0])
        console.log(data.data[0])
        axios.get(ip + 'server/' + id).then(data => {
          if (data.data.length === 1) {
            setTitle(data.data[0].server_name)

            const socket = io.connect(socketip + id)
            setSocket(socket)
            socket.on('player count', function (data) {
              setPlayers(data)
              setInGame(true)
              setIsLoading(false)
            })

            // socket.on('connect', function () {
            //   onEnter()
            // })

            socket.on('chat recieve', function (chat) {
              const reply = document.createElement('li')
              reply.setAttribute('style', 'padding:0px 0px')
              const span1 = document.createElement('span')
              span1.setAttribute(
                'style',
                'padding: 0; margin: 0;font-weight: 500;font-size: 14px;line-height: 1.5;color: #83a0f5;'
              )
              span1.innerHTML = chat.from + ': '
              const span2 = document.createElement('span')
              span2.setAttribute(
                'style',
                'padding: 0; margin: 0;font-weight: 300;font-size: 14px;line-height: 1.5;color: #83a0f5'
              )
              span2.innerHTML = chat.message
              reply.appendChild(span1)
              reply.appendChild(span2)
              const container = document.getElementById('gametext')
              container.appendChild(reply)
              updateScroll()
            })
          } else {
            console.log('SERVER DOES NOT EXISTS')
          }
        })
      } else {
        setInGame(true)
        setIsLoading(false)
        setCreateCharacter(true)
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
        reply.setAttribute(
          'style',
          'padding: 5px 0; margin: 0;font-weight: 500;font-size: 14px;line-height: 1.5;color: #f58383'
        )
        container.appendChild(reply)
        updateScroll()
      } else {
        // const reply = document.createElement('li')
        // reply.setAttribute('style', 'padding:0px 0px')
        // const span1 = document.createElement('span')
        // span1.setAttribute(
        //   'style',
        //   'padding: 0; margin: 0;font-weight: 500;font-size: 14px;line-height: 1.5;color: #83a0f5;'
        // )
        // span1.innerHTML = 'Player: '
        // const span2 = document.createElement('span')
        // span2.setAttribute(
        //   'style',
        //   'padding: 0; margin: 0;font-weight: 300;font-size: 14px;line-height: 1.5;color: #83a0f5'
        // )
        // span2.innerHTML = command
        // reply.appendChild(span1)
        // reply.appendChild(span2)
        // container.appendChild(reply)
        // updateScroll()
        const chat = {
          message: command,
          from: character.username
        }
        socket.emit('chat send', chat)
      }
    }
  }

  function onEnter () {
    const levelName = 'Default Room'
    const levelDescription =
      'Welcome to the zone. Many good things are on this level. So many cool things to see and do. I am trying to fill up as much space on this field as possible. Is this working now?'
    const container = document.getElementById('gametext')
    const levelNameHeader = document.createElement('h5')
    const span1 = document.createElement('span')
    const span2 = document.createElement('span')

    levelNameHeader.setAttribute(
      'style',
      'padding:10px 0 0 0;margin: 0;font-size: 14px;font-weight: 400;line-height: 1.5'
    )
    span1.setAttribute('style', 'color:white')
    span1.innerHTML = 'Entering: '
    span2.setAttribute('style', 'color:#f5c983;')
    span2.innerHTML = levelName
    levelNameHeader.appendChild(span1)
    levelNameHeader.appendChild(span2)
    container.appendChild(levelNameHeader)

    const levelDescriptionHeader = document.createElement('li')
    levelDescriptionHeader.innerHTML = levelDescription
    levelDescriptionHeader.setAttribute(
      'style',
      'padding: 0 0 10px 0; margin: 0;font-weight: 300;font-size: 14px;line-height: 1.5'
    )
    container.appendChild(levelDescriptionHeader)

    updateScroll()
  }

  function updateScroll () {
    var element = document.getElementById('gametextdiv')
    element.scrollTop = element.scrollHeight
  }

  return (
    <div>
      {createCharacter ? (
        <ServerCharacter />
      ) : isLoading || character == null ? (
        <Loading />
      ) : (
        <div className='row'>
          <div className='left-column'>
            <div
              className='header'
              style={{
                width: '100%',
                paddingTop: '15px'
              }}
            >
              <div
                style={{
                  display: 'block',
                  float: 'left'
                }}
              >
                <h1 style={{ padding: 0, margin: 0, fontSize: '16px' }}>
                  {title}
                </h1>
                <h2 style={{ padding: 0, margin: 0, fontSize: '12px' }}>
                  <span style={{ color: '#f5c983' }}>Players Online:</span>{' '}
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

            <center>
              <div
                style={{
                  width: '100%',
                  height: '250px',
                  backgroundColor: '#191A1C',
                  display: 'block',
                  float: 'left',
                  margin: 'auto'
                }}
              />
            </center>

            <center>
              <img
                src={Logo}
                style={{
                  width: '20px',
                  marginTop: '150px',
                  marginBottom: '5px'
                }}
                alt='a wizard hat with a feather in it'
              />
              <a
                href='/servers/'
                style={{
                  width: '100%',
                  display: 'block',
                  textAlign: 'center',
                  marginBottom: '5px',
                  fontSize: '14px'
                }}
              >
                Privacy Policy
              </a>
              <a
                href='/servers/'
                style={{
                  width: '100%',
                  display: 'block',
                  textAlign: 'center',
                  marginBottom: '5px',
                  fontSize: '14px'
                }}
              >
                Report a Bug
              </a>
              <a
                href='/library'
                style={{
                  width: '100%',
                  display: 'block',
                  textAlign: 'center',
                  fontSize: '14px'
                }}
              >
                Exit Game
              </a>
              <h5 style={{ color: '#f5c983', margin: '20px', padding: 0 }}>
                &copy; 2020 Fableverse, LLC
              </h5>
            </center>
          </div>
          <div className='center-column'>
            <div
              id='gametextdiv'
              style={{
                width: '100%',
                height: '92vh',
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
          <div className='right-column'>
            <h3 style={{ margin: '15px' }}>
              {character.username}{' '}
              <span style={{ float: 'right' }}>
                <span style={{ color: 'rgb(245, 201, 131)' }}>Level: </span>
                {character.level}
              </span>
            </h3>

            <h5 style={{ padding: '5px', margin: '0', textAlign: 'center' }}>
              Experience
            </h5>
            <div
              className='experience-container'
              style={{
                boxSizing: 'border-box',
                width: '90%',
                backgroundColor: 'rgb(55, 56, 58)',
                borderRadius: '6px',
                margin: 'auto'
              }}
            >
              <div
                className='experience-bar'
                style={{
                  height: '6px',
                  width: '50%',
                  backgroundColor: '#4150DA',
                  borderRadius: '6px'
                }}
              />
            </div>
            <h5 style={{ padding: '5px', margin: '0', textAlign: 'center' }}>
              Health
            </h5>
            <div
              className='health-container'
              style={{
                boxSizing: 'border-box',
                width: '90%',
                backgroundColor: 'rgb(55, 56, 58)',
                borderRadius: '6px',
                margin: 'auto'
              }}
            >
              <div
                className='health-bar'
                style={{
                  height: '6px',
                  width:
                    (parseFloat(character.health) / character.max_health) *
                      100 +
                    '%',
                  backgroundColor: '#DA4141',
                  borderRadius: '6px'
                }}
              />
            </div>
            <h5 style={{ padding: '5px', margin: '0', textAlign: 'center' }}>
              Mana
            </h5>
            <div
              className='mana-container'
              style={{
                boxSizing: 'border-box',
                width: '90%',
                backgroundColor: 'rgb(55, 56, 58)',
                borderRadius: '6px',
                margin: 'auto'
              }}
            >
              <div
                className='mana-bar'
                style={{
                  height: '6px',
                  width: '50%',
                  backgroundColor: '#EB0BFF',
                  borderRadius: '6px'
                }}
              />
            </div>
            <h5 style={{ padding: '5px', margin: '0', textAlign: 'center' }}>
              Stamina
            </h5>
            <div
              className='stamina-container'
              style={{
                boxSizing: 'border-box',
                width: '90%',
                backgroundColor: 'rgb(55, 56, 58)',
                margin: 'auto',
                borderRadius: '6px'
              }}
            >
              <div
                className='stamina-bar'
                style={{
                  height: '6px',
                  width: '50%',
                  backgroundColor: '#41DA47',
                  borderRadius: '6px'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServerPlay
