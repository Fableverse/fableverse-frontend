import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Image from '../../../../images/background.jpg'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

import Loading from '../../../loading/loading'

const ip = process.env.REACT_APP_API_IP

function ServerCreate () {
  const [servers, setServers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    function refresh () {
      axios.get(ip + 'server/').then(data => {
        console.log('Updated!')
        setServers(data.data)
        setIsLoading(false)
      })
    }
    refresh()
  }, [])

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Container fluid>
            <Row>
              <Col
                sm={3}
                style={{
                  height: '100vh',
                  backgroundColor: '#141414',
                  padding: '0px'
                }}
              >
                <Row>
                  <Col sm={12}>
                    <center>
                      <h5
                        style={{
                          color: 'lightgray',
                          fontSize: '11px',
                          margin: '0',
                          marginTop: '10px',
                          padding: '5px 0'
                        }}
                      >
                        DEVELOPER ACCESS
                      </h5>
                    </center>
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <center>
                      <h5
                        style={{
                          color: 'lightgray',
                          fontSize: '11px',
                          margin: '0',
                          marginTop: '10px',
                          padding: '5px 0'
                        }}
                      >
                        MY LIBRARY
                      </h5>
                    </center>
                  </Col>
                </Row>
                {servers.map((server, i) => {
                  const {
                    account_id,
                    id,
                    server_name,
                    description,
                    status
                  } = server
                  return (
                    <Link to={'/game/' + id}>
                      <Row
                        className='library-game'
                        style={{ width: '100%', margin: '0' }}
                      >
                        <Col lg={12}>
                          <h5
                            style={{
                              color: 'lightgray',
                              fontSize: '11px',
                              margin: '0',
                              width: '100%',
                              padding: '5px'
                            }}
                          >
                            <img
                              src={Image}
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '4px',
                                marginRight: '5px'
                              }}
                            />
                            {server_name}
                            <span style={{ float: 'right', padding: '2px' }}>
                              Players: 0
                            </span>
                          </h5>
                        </Col>
                      </Row>
                    </Link>
                  )
                })}
              </Col>
              <Col sm={9}></Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  )
}

export default ServerCreate
