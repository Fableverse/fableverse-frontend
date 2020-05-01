import React, { useEffect } from 'react'
import './App.css'

import { Switch, Route, Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import Landing from './components/pages/public/landing/landing'
import Login from './components/pages/public/login/login'
import Register from './components/pages/public/register/register'
import Motd from './components/pages/private/motd/motd'

const ip = 'http://localhost:8001/'
let isAuthenticated = false

function App () {
  let history = useHistory()
  const startingLocation = history.location

  useEffect(() => {
    axios
      .post(ip + 'user/validate')
      .then(res => {
        if (res.status === 200) {
          isAuthenticated = true
          history.push(startingLocation)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
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
    isAuthenticated = false
    history.push('/')
  }

  function register (email, password) {
    axios
      .post(ip + 'user/register', {
        email: email,
        password: password
      })
      .then(res => {
        console.log(res.status)
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
            <li>
              <Link to='/login' onClick={signout}>
                Signout
              </Link>
            </li>
          ) : (
            ''
          )}
        </ul>
      </nav>

      <Switch>
        <Route path='/login'>
          <Login login={login} />
        </Route>
        <Route path='/register'>
          <Register register={register} />
        </Route>

        <PrivateRoute path='/motd' component={Motd} />

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
