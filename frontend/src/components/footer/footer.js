import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'

function Footer () {
  return (
    <div style={{ backgroundColor: '#2a2a2a' }}>
      <Row
        style={{
          margin: '30px',
          marginBottom: '0px',
          paddingTop: '30px',
          borderBottom: '1px solid rgba(255,255,255,.1)',
          color: 'white'
        }}
      >
        <Col sm={6} style={{ paddingLeft: '0' }}>
          <h1 className='title' style={{ fontSize: '36px', margin: 0 }}>
            FABLEVERSE
          </h1>
        </Col>
        <Col sm={3}>
          <h5 class='text-uppercase' style={{ fontSize: '14px' }}>
            Resources
          </h5>
          <ul class='list-unstyled' style={{ fontSize: '12px', color: 'grey' }}>
            <li>
              <a href='#!'>Documentations</a>
            </li>
            <li>
              <a href='#!'>Community</a>
            </li>
            <li>
              <a href='#!'>FAQ</a>
            </li>
            <li>
              <a href='#!'>Services Status</a>
            </li>
            <li>
              <a href='#!'>Support</a>
            </li>
          </ul>
        </Col>
        <Col sm={3}>
          <h5 class='text-uppercase' style={{ fontSize: '14px' }}>
            About Fableverse
          </h5>
          <ul class='list-unstyled' style={{ fontSize: '12px', color: 'grey' }}>
            <li>
              <a href='#!'>About Us</a>
            </li>
            <li>
              <a href='#!'>News</a>
            </li>
            <li>
              <a href='#!'>Careers</a>
            </li>
            <li>
              <a href='#!'>Contact</a>
            </li>
            <li>
              <a href='#!'>Press</a>
            </li>
            <li>
              <a href='#!'>Security</a>
            </li>
          </ul>
        </Col>
      </Row>
      <Row
        style={{
          backgroundColor: '#2a2a2a',
          color: 'white',
          padding: '5px 30px',
          fontSize: '11px',
          paddingBottom: '20px'
        }}
      >
        <Col sm={12} style={{ fontSize: '12px' }}>
          <p style={{ padding: 0, margin: 0, fontSize: '12px' }}>
            Copyright &copy; 2020 Fableverse, LLC
          </p>
          <a style={{ marginRight: '10px', color: 'grey' }}>Legal</a>{' '}
          <a style={{ marginRight: '10px', color: 'grey' }}>Privacy Policy</a>{' '}
          <a style={{ marginRight: '10px', color: 'grey' }}>Cookies</a>{' '}
          <a style={{ marginRight: '10px', color: 'grey' }}>Terms of Service</a>
        </Col>
      </Row>
    </div>
  )
}

export default Footer
