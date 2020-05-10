import React from 'react'

function Login ({ login, isLoading }) {
  function handleLogin () {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email, password)
  }

  return (
    <div>
      {isLoading ? (
        ''
      ) : (
        <center>
          <h1>Login</h1>
          <div>
            <input
              type='text'
              id='email'
              name='email'
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  handleLogin()
                }
              }}
              placeholder='Email...'
            />
            <br />
            <input
              type='password'
              id='password'
              name='password'
              onKeyPress={event => {
                if (event.key === 'Enter') {
                  handleLogin()
                }
              }}
              placeholder='Password...'
            />
            <br />
            <button onClick={handleLogin}>Login</button>
          </div>
        </center>
      )}
    </div>
  )
}

export default Login
