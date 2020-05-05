import React from 'react'

function Register ({ register }) {
  function handleRegister () {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    register(email, password)
  }

  return (
    <div>
      <center>
        <h1>Register</h1>
        <div>
          <input
            type='text'
            id='email'
            name='email'
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleRegister()
              }
            }}
            placeholder='Email...'
          />
          <br />
          <input
            type='text'
            id='password'
            name='password'
            onKeyPress={event => {
              if (event.key === 'Enter') {
                handleRegister()
              }
            }}
            placeholder='Password...'
          />
          <br />
          <button onClick={handleRegister}>Register</button>
        </div>
      </center>
    </div>
  )
}

export default Register
