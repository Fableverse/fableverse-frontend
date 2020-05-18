import React, { useEffect, useState } from 'react'
import './App.css'

import { Switch, Route, Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import Landing from './components/pages/public/landing/landing'
import Login from './components/pages/public/login/login'
import Register from './components/pages/public/register/register'
import Motd from './components/pages/private/motd/motd'
import ServerCreate from './components/pages/private/server-create/server-create'
import ServerList from './components/pages/private/server-list/server-list'
import ServerPlay from './components/pages/private/server-play/server-play'

const ip = 'http://161.35.111.85:8001/'
let validated = false
let isAuthenticated = false
axios.defaults.withCredentials = true

function App () {
  const [inGame, setInGame] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  let history = useHistory()
  const startingLocation = history.location

  useEffect(() => {
    function getCookie (cname) {
      var name = cname + '='
      var decodedCookie = decodeURIComponent(document.cookie)
      var ca = decodedCookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') {
          c = c.substring(1)
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length)
        }
      }
      return ''
    }
    if (getCookie('token') !== '' && !validated) {
      validated = true
      axios
        .post(ip + 'user/validate')
        .then(res => {
          if (res.status === 200) {
            isAuthenticated = true
            history.push(startingLocation)
          } else {
            setIsLoading(false)
          }
        })
        .catch(function (error) {
          console.log('Token has expired.')
        })
    } else {
      setIsLoading(false)
    }
  }, [history, startingLocation])

  function login (email, password) {
    axios
      .post(ip + 'user/login', {
        email: email,
        password: password
      })
      .then(res => {
        if (res.status === 200) {
          isAuthenticated = true
          history.push('/')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function signout () {
    document.cookie = 'token=; Max-Age=-99999999;'
    setTimeout(() => {
      isAuthenticated = false
      history.push('/login')
    }, 100)
  }

  function register (email, password) {
    axios
      .post(ip + 'user/register', {
        email: email,
        password: password
      })
      .then(res => {
        console.log(res.status)
        history.push('/login')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          history.push('/login')
        )
      }
    />
  )

  return (
    <div>
      {inGame || isLoading ? (
        ''
      ) : (
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            {isAuthenticated ? (
              ''
            ) : (
              <div>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
                <li>
                  <Link to='/register'>Register</Link>
                </li>
              </div>
            )}

            {isAuthenticated ? (
              <div>
                <li>
                  <Link to='/servers/create'>Create Server</Link>
                </li>
                <li>
                  <Link to='/servers/'>Server List</Link>
                </li>
                <li>
                  <Link to='/login' onClick={signout}>
                    Signout
                  </Link>
                </li>
              </div>
            ) : (
              ''
            )}
          </ul>
        </nav>
      )}

      <Switch>
        <Route path='/login'>
          <Login login={login} isLoading={isLoading} />
        </Route>
        <Route path='/register'>
          <Register register={register} />
        </Route>

        <PrivateRoute path='/motd' component={Motd} />
        <PrivateRoute path='/servers/create' component={ServerCreate} />

        <Route
          path='/servers/:id'
          render={props =>
            isAuthenticated === true ? (
              <ServerPlay setInGame={setInGame} />
            ) : (
              history.push('/login')
            )
          }
        />
        <PrivateRoute path='/servers/' component={ServerList} />

        {isAuthenticated ? (
          <Route path='/'>
            <Motd />
          </Route>
        ) : (
          <Route path='/'>
            <Landing />
          </Route>
        )}
      </Switch>
    </div>
  )
}

export default App
