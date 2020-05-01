import React from 'react'

function Register ({ register }) {
  function handleRegister () {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    register(email, password)
  }

  return (
    <div>
      <input type='text' id='email' name='email' placeholder='Email...' />
      <br />
      <input
        type='text'
        id='password'
        name='password'
        placeholder='Password...'
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default Register
