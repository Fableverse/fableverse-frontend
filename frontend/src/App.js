import React, { useEffect, useState } from 'react'
import './App.css'

import { Switch, Route, Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import Logo from './images/logo.jpg'

import Landing from './components/pages/public/landing/landing'
import Login from './components/pages/public/login/login'
import Register from './components/pages/public/register/register'
import ServerCreate from './components/pages/private/server-create/server-create'
import ServerMarketplace from './components/pages/private/server-marketplace/server-marketplace'
import ServerPlay from './components/pages/private/server-play/server-play'
import ServerList from './components/pages/private/server-list/server-list'

import Footer from './components/footer/footer'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

const ip = process.env.REACT_APP_API_IP

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
        <div>
          <Navbar
            collapseOnSelect
            expand='lg'
            variant='dark'
            style={{ backgroundColor: 'white !important' }}
          >
            <Link to='/'>
              <Navbar.Brand className='title'>FABLEVERSE</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='mr-auto'></Nav>

              {isAuthenticated ? (
                <Nav>
                  <Link className='nav-link' to='/marketplace'>
                    MARKETPLACE
                  </Link>
                  <Link className='nav-link' to='/library'>
                    MY GAMES
                  </Link>
                  <Link className='nav-link' to='/game/create'>
                    CREATE A GAME
                  </Link>
                  <Link className='nav-link' onClick={signout}>
                    SIGNOUT
                  </Link>
                  <Link to='/'>
                    <Button>ACCOUNT</Button>
                  </Link>
                </Nav>
              ) : (
                <Nav>
                  <Link className='nav-link' to='/news'>
                    NEWS
                  </Link>
                  <Link className='nav-link' to='/about'>
                    ABOUT
                  </Link>
                  <Link className='nav-link' to='/solutions'>
                    SOLUTIONS
                  </Link>
                  <Link className='nav-link' to='/learning'>
                    LEARNING
                  </Link>
                  <Link className='nav-link' to='/support'>
                    SUPPORT
                  </Link>
                  <Link className='nav-link' to='/community'>
                    COMMUNITY
                  </Link>
                  <Link className='nav-link' to='/subscription'>
                    PRICING
                  </Link>
                  <Link className='nav-link' to='/marketplace'>
                    MARKETPLACE
                  </Link>
                  <Link className='nav-link' to='/login'>
                    SIGN IN
                  </Link>
                  <Link to='/register'>
                    <Button>GET STARTED</Button>
                  </Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Navbar>
        </div>
      )}

      <Switch>
        <Route path='/login'>
          <Login login={login} isLoading={isLoading} />
        </Route>
        <Route path='/register'>
          <Register register={register} />
        </Route>

        <PrivateRoute path='/game/create' component={ServerCreate} />
        <PrivateRoute path='/library' component={ServerList} />

        <Route
          path='/game/:id'
          render={props =>
            isAuthenticated === true ? (
              <ServerPlay setInGame={setInGame} />
            ) : (
              history.push('/login')
            )
          }
        />

        <Route path='/marketplace'>
          <ServerMarketplace />
        </Route>

        {isAuthenticated ? (
          <Route path='/'>
            <ServerList />
          </Route>
        ) : (
          <Route path='/'>
            <Landing />
          </Route>
        )}
      </Switch>

      <Footer />
    </div>
  )
}

export default App
