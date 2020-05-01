import React from 'react'

function Login ({ login }) {
  function handleLogin () {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email, password)
  }

  return (
    <div>
      <input type='text' id='email' name='email' placeholder='Email...' />
      <br />
      <input
        type='password'
        id='password'
        name='password'
        placeholder='Password...'
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
