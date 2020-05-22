import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import Background from '../../../../images/background2.jpg'

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
        <Container fluid style={{ margin: 0 }}>
          <Row>
            <Col sm={4} style={{ padding: 0 }}>
              <img
                src={Background}
                style={{
                  width: '100%',
                  height: '92vh',
                  objectFit: 'cover'
                }}
              />
            </Col>
            <Col sm={8} style={{ marginBottom: '50px' }}>
              <Row>
                <Col lg={2} />
                <Col lg={5}>
                  <h1 style={{ marginTop: '20vh' }}>Log into Fableverse</h1>
                  <p style={{ color: 'lightgrey' }}>
                    Enter your login details below.
                  </p>
                  <label style={{ color: 'white', fontSize: '11px' }}>
                    EMAIL ADDRESS
                  </label>
                  <InputGroup
                    size='sm'
                    className='mb-3'
                    style={{ width: '100%' }}
                  >
                    <InputGroup.Prepend>
                      <InputGroup.Text
                        id='inputGroup-sizing-sm'
                        style={{ width: '90px' }}
                      >
                        Email:
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label='Small'
                      aria-describedby='inputGroup-sizing-sm'
                      placeholder='johndoe@gmail.com'
                      onKeyPress={event => {
                        if (event.key === 'Enter') {
                          handleLogin()
                        }
                      }}
                      id='email'
                    />
                  </InputGroup>
                  <label
                    style={{ color: 'white', fontSize: '11px', width: '100%' }}
                  >
                    PASSWORD{' '}
                    <a href='/'>
                      <span
                        style={{ float: 'right', textDecoration: 'underline' }}
                      >
                        Forgot your Password?
                      </span>
                    </a>
                  </label>
                  <InputGroup
                    size='sm'
                    className='mb-3'
                    style={{ width: '100%' }}
                  >
                    <InputGroup.Prepend>
                      <InputGroup.Text
                        id='inputGroup-sizing-sm'
                        style={{ width: '90px' }}
                      >
                        Password:
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      type='password'
                      aria-label='Small'
                      aria-describedby='inputGroup-sizing-sm'
                      placeholder='Enter your password...'
                      onKeyPress={event => {
                        if (event.key === 'Enter') {
                          handleLogin()
                        }
                      }}
                      id='password'
                    />
                  </InputGroup>
                  <Form.Group controlId='formBasicCheckbox'>
                    <Form.Check
                      type='checkbox'
                      label='Remember me'
                      style={{ color: 'white', margin: '30px 0' }}
                    />
                  </Form.Group>

                  <Button variant='outline-primary' onClick={handleLogin}>
                    Log in
                  </Button>
                  <Button
                    variant='outline-primary'
                    style={{ marginLeft: '10px', borderColor: 'white' }}
                  >
                    No Account?
                  </Button>

                  <Col lg={5} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default Login
