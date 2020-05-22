import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import Background from '../../../../images/background5.jpg'
function Register ({ register }) {
  let isLoading = false
  function handleRegister () {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    register(email, password)
  }

  return (
    <div>
      {isLoading ? (
        ''
      ) : (
        <Container fluid style={{ margin: 0 }}>
          <Row>
            <Col sm={6} style={{ marginBottom: '50px' }}>
              <Row>
                <Col lg={2} />
                <Col lg={7}>
                  <h1 style={{ marginTop: '20vh' }}>Join the Fableverse</h1>
                  <p style={{ color: 'lightgrey' }}>
                    Enter an email and create a password.
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
                          handleRegister()
                        }
                      }}
                      id='email'
                    />
                  </InputGroup>
                  <label
                    style={{ color: 'white', fontSize: '11px', width: '100%' }}
                  >
                    PASSWORD{' '}
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
                      aria-label='Small'
                      aria-describedby='inputGroup-sizing-sm'
                      placeholder='Enter a password...'
                      onKeyPress={event => {
                        if (event.key === 'Enter') {
                          handleRegister()
                        }
                      }}
                      id='password'
                    />
                  </InputGroup>

                  <Button variant='outline-primary' onClick={handleRegister}>
                    Register
                  </Button>
                  <Button
                    variant='outline-primary'
                    style={{ marginLeft: '10px', borderColor: 'white' }}
                  >
                    Go to Login
                  </Button>

                  <Col lg={3} />
                </Col>
              </Row>
            </Col>
            <Col sm={6} style={{ padding: 0 }}>
              <img
                src={Background}
                style={{
                  width: '100%',
                  height: '92vh',
                  objectFit: 'cover'
                }}
              />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  )
}

export default Register
