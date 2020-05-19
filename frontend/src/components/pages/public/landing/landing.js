import React from 'react'
import Background from '../../../../images/background.jpg'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'

function Landing () {
  return (
    <div>
      <img
        src={Background}
        style={{ width: '100%', height: '92vh', objectFit: 'cover' }}
      />
      <Row>
        <Col sm={6} style={{ padding: '35px' }}>
          <img
            src={Background}
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
          />
        </Col>
        <Col sm={6} style={{ padding: '35px' }}>
          <h1>Uncompromised quality, proven results</h1>
          <p>
            Unreal Engine is a state-of-the-art real-time engine and editor that
            features photorealistic rendering, dynamic physics and effects,
            lifelike animation, robust data translation, and much more—on a
            open, extensible platform that won't tie you down.
          </p>
          <button>SEE ALL FEATURES</button>
        </Col>
      </Row>
      <Row>
        <Col sm={6} style={{ padding: '35px' }}>
          <h1>Uncompromised quality, proven results</h1>
          <p>
            Unreal Engine is a state-of-the-art real-time engine and editor that
            features photorealistic rendering, dynamic physics and effects,
            lifelike animation, robust data translation, and much more—on a
            open, extensible platform that won't tie you down.
          </p>
          <button>SEE ALL FEATURES</button>
        </Col>
        <Col sm={6} style={{ padding: '35px' }}>
          <img
            src={Background}
            style={{ width: '100%', height: '300px', objectFit: 'cover' }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Landing
