import React, { useState } from 'react'
import Screenshot from '../../../images/screenshot.png'
import PatreonButton from '../../../images/patreonbutton.png'
import Divider from '../../../images/divider.png'
import Dragon from '../../../images/dragon.png'
import Logo from '../../../images/logo.jpg'
import Archer from '../../../images/archer.jpg'
import Demon from '../../../images/demon.png'
import Warrior from '../../../images/warrior.png'
import Brandon from '../../../images/brandon.jpg'
import Zax from '../../../images/zax2.png'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'

import {
  faDiscord,
  faRedditSquare,
  faTwitterSquare,
  faFacebookSquare,
  faYoutubeSquare,
  faTwitch,
  faGithub
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import axios from 'axios'

function Landing2 () {
  const [error, setError] = useState('')

  function ValidateEmail (mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true
    }
    setError('Something is wrong with your email!')
    return false
  }

  function handleSignup () {
    setError('')
    const email = document.getElementById('email').value

    if (ValidateEmail(email)) {
      axios
        .post('https://fableverse.com:8000/signup', {
          email: email
        })
        .then(res => {
          if (res.status === 200) {
            document.getElementById('email').value = ''
            showSnackbar()
          } else {
            setError('Something is wrong with your email or our servers :(')
          }
        })
        .catch(function (error) {
          console.log('Something went really wrong.')
        })
    }
  }

  function showSnackbar () {
    // Get the snackbar DIV
    var x = document.getElementById('snackbar')

    // Add the "show" class to DIV
    x.className = 'show'

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
      x.className = x.className.replace('show', '')
    }, 4000)
  }

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand='lg'
        variant='light'
        style={{ backgroundColor: 'white !important' }}
      >
        <Navbar.Brand href='#home' className='title'>
          <img
            src={Logo}
            style={{ width: '60px' }}
            alt='a gray hat and feather'
          />
          FABLEVERSE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'></Nav>
          <Nav>
            {/* <Nav.Link href='#deets'>Features</Nav.Link>
            <Nav.Link eventKey={2} href='#memes'>
              Screenshots
            </Nav.Link> */}
            <Button href='#beta'>Beta Sign-up</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <Row id='test'>
          <Col sm={5} data-aos='fade-right'>
            <h1 style={{ marginTop: '150px' }}>
              Your World, Your Players, Your Way
            </h1>
            <h5>
              A Text-Based MMORPG Engine & Platform for PC & Mobile Devices.
            </h5>
            <div style={{ marginTop: '30px' }}>
              <Button
                href='https://discord.gg/CvYy8M9'
                target='_blank'
                rel='noopener'
                style={{ backgroundColor: 'red !important', marginTop: '10px' }}
              >
                <FontAwesomeIcon
                  icon={faDiscord}
                  className='icon'
                  style={{ color: '#fffff', marginRight: '10px' }}
                />
                Join our Discord
              </Button>{' '}
              <Button
                href='https://github.com/fableverse'
                target='_blank'
                rel='noopener'
                variant='secondary'
                style={{ marginTop: '10px' }}
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  className='icon'
                  style={{ color: '#fffff', marginRight: '10px' }}
                />
                View Source-Code
              </Button>
            </div>
          </Col>
          <Col sm={7} style={{ textAlign: 'center' }} data-aos='fade-left'>
            <img
              src={Screenshot}
              style={{
                width: '100%',
                marginTop: '100px',
                borderRadius: '14px',
                boxShadow: '4px 4px 9px rgba(0,0,0,.22)',
                border: '4px solid rgb(129, 85, 220)'
              }}
              alt='a screenshot of the players perspective of fableverse'
            />
          </Col>
        </Row>

        <center>
          <img
            src={Divider}
            style={{ width: '200px', marginTop: '100px' }}
            alt='a decrative divider'
          />
        </center>

        {/* ============= Features ============= */}

        <Row>
          <Col sm={4}>
            <center>
              <img src={Archer} style={{ width: '80%' }} />
            </center>
          </Col>
          <Col sm={4}>
            <center>
              <img src={Demon} style={{ width: '100%' }} />
            </center>
          </Col>
          <Col sm={4}>
            <center>
              <img src={Warrior} style={{ width: '80%' }} />
            </center>
          </Col>
        </Row>

        <center>
          <img
            src={Divider}
            style={{ width: '200px', marginTop: '00px' }}
            alt='a decrative divider'
          />
        </center>

        <center>
          <h1 className='title'>FEATURES</h1>
          <p style={{ marginBottom: '50px' }}>
            A list of features that will be on the platform.
          </p>
        </center>

        <Row style={{ marginBottom: '30px' }}>
          <Col sm={5}>
            <h1 className='title'>Fully Customizable</h1>
            <p>
              The power is in your hands. Utilize a powerful editor to tailor
              every aspect of gameplay to your needs. Adjust formulas on the
              fly, build characters, design items & equipment, craft unique
              stories. The choice is yours.
            </p>
          </Col>
          <Col sm={2} />
          <Col sm={5}>
            <h1 className='title'>Massively Multiplayer</h1>
            <p>
              Utilize the latest in cloud computing technology to power your
              worlds. Large concurrent player counts, deep player-to-player
              interaction, a dynamic chat system. Take your creations online
              with ease at the press of a button.
            </p>
          </Col>
        </Row>
        <Row style={{ marginBottom: '30px' }}>
          <Col sm={5}>
            <h1 className='title'>One Fableverse</h1>
            <p>
              Delve into a deeply connected & evolving platform. Engage with
              other Fablers through Community Chat, read the latest updates as
              they arrive, browse through a vast library of games. Always
              growing, this is your Fableverse.
            </p>
          </Col>
          <Col sm={2} />
          <Col sm={5}>
            <h1 className='title'>Open Source</h1>
            <p>
              Certain tools and frontend components will be made open-source
              with the MIT license. Witness how Fableverse powers your worlds
              internally, view aspects of development hot off the press, and use
              our frontend as a learning resource. Transparency in development
              for your benefit.
            </p>
          </Col>
        </Row>
        <Row>
          <Col sm={5}>
            <h1 className='title'>Discover Worlds</h1>
            <p>
              Browse through a quality curated marketplace. Check out the latest
              featured titles, use filters to customize your browsing
              experience, leave a review for others to see. Embark on your next
              grand adventure in style.
            </p>
          </Col>
          <Col sm={2} />
          <Col sm={5}>
            <h1 className='title'>Developer’s Choice</h1>
            <p>
              Distribute your creations with flexibility. Create a highly
              tailored subscription experience, open the gates with
              Free-to-Play, allow for additional payment options in-game. Your
              World, Your Players, Your Way, Your Fableverse.
            </p>
          </Col>
        </Row>

        <center>
          <img
            src={Divider}
            style={{ width: '200px', marginTop: '30px' }}
            alt='a decrative divider'
          />
        </center>

        {/* ============= Team ============= */}
        <center>
          <h1 className='title' style={{ marginTop: '20px' }}>
            Meet the Team
          </h1>
        </center>
        <Row>
          <Col sm={1} />
          <Col sm={4}>
            <center>
              <img
                src={Brandon}
                style={{
                  width: '70%',
                  borderRadius: '1000px',
                  border: '1px solid rgba(100,100,100,.2)',
                  boxShadow: '4px 4px 9px rgba(0, 0, 0, 0.22)'
                }}
              />
            </center>
            <center>
              <h1 className='title' style={{ marginTop: '20px' }}>
                Brandon "Braymen" Pessman
              </h1>
              <h5>Head of Engineering</h5>
              <p>
                Brandon is a passionate web developer and entrepreneur who loves
                building and breaking things. He loves to shake things up and
                try new things, in an attempt to create something better.
                Fableverse is a passion project created out of thirst for an
                easy to use web MMORPG engine.
              </p>
              <p>
                When he is not working on Fableverse, he is enjoying the
                outdoors or watching some of his favorite movies (Star Wars,
                Inception, and The Martian). He also loves to travel to new
                places and try new foods.
              </p>
            </center>
          </Col>
          <Col sm={2} />
          <Col sm={4}>
            <center>
              <img
                src={Zax}
                style={{
                  width: '70%',
                  borderRadius: '1000px',
                  border: '1px solid rgba(100,100,100,.2)',
                  boxShadow: '4px 4px 9px rgba(0, 0, 0, 0.22)'
                }}
              />
            </center>
            <center>
              <h1 className='title' style={{ marginTop: '20px' }}>
                Zach 'Zaxwlyde' Kerr
              </h1>
              <h5>Head of Marketing & Design</h5>
              <p>
                Zach is a loving father and passionate designer whom has deeply
                invested himself in writing since he was nine years old. Driven
                by a desire to bring together fantastical worlds of different
                shapes and sizes, he's set his sights on Fableverse as his next
                grand adventure.
              </p>
              <p>
                In his downtime, Zach enjoys spending time with his family in a
                variety of extracurricular activities. His favorite hobby is to
                travel and explore new places, visiting Boston yearly for PAX
                East.
              </p>
              <Col sm={1} />
            </center>
          </Col>
        </Row>

        <center>
          <img
            src={Divider}
            style={{ width: '200px', marginTop: '100px' }}
            alt='a decrative divider'
          />
        </center>
        {/* ============= faq ============= */}
        <center>
          <h1 className='title'>FAQ</h1>
          <p>Frequently asked questions, answered.</p>
        </center>
        <Row
          style={{
            marginBottom: '0px'
          }}
        >
          <Col sm={2} />
          <Col
            sm={8}
            style={{
              paddingTop: '20px'
            }}
          >
            <h4>What is Fableverse?</h4>
            <p>
              Fableverse is an in-development text-based MMORPG Engine in
              development by The Fableverse Team for PC & Mobile Devices.
            </p>
          </Col>
          <Col sm={2} />
        </Row>
        <Row
          style={{
            marginBottom: '0px'
          }}
        >
          <Col sm={2} />
          <Col
            sm={8}
            style={{
              paddingTop: '20px'
            }}
          >
            <h4>When is Fableverse set to release?</h4>
            <p>
              Fableverse is currently projected to enter Alpha by August 2020
              with Beta following in 2021.
            </p>
          </Col>
          <Col sm={2} />
        </Row>
        <Row
          style={{
            marginBottom: '0px'
          }}
        >
          <Col sm={2} />
          <Col
            sm={8}
            style={{
              paddingTop: '20px'
            }}
          >
            <h4>How do I try Fableverse?</h4>
            <p>
              We've made it quite simple! You can sign up for Beta using the
              button below. Stay tuned for more information as development
              continues!
            </p>
          </Col>
          <Col sm={2} />
        </Row>
        <Row
          style={{
            marginBottom: '0px'
          }}
        >
          <Col sm={2} />
          <Col
            sm={8}
            style={{
              paddingTop: '20px'
            }}
          >
            <h4>Is Fableverse free?</h4>
            <p>
              A complex answer to a seemingly simple question. Fableverse will
              allow developers to create their adventures free of cost until
              point of launch. Upon launching, you'll have the ability to pick
              one of several tiers in our priced-subscription model. In return,
              we'll handle your entire network infrastructure and maintain it,
              allowing you the peace of mind to focus on content development and
              community growth.
            </p>
            <p>
              Pricing and further details will be unveiled for these options at
              a later date, stay tuned!
            </p>
          </Col>
          <Col sm={2} />
        </Row>
        <Row
          style={{
            marginBottom: '0px'
          }}
        >
          <Col sm={2} />
          <Col
            sm={8}
            style={{
              paddingTop: '20px'
            }}
          >
            <h4>Will Fableverse have a Public RESTful API?</h4>
            <p>
              It will! We are looking into how we can buid public endpoints so
              anyone can build tools and analytics for their games. We don't
              have all the details on what this will look like right now, but
              it's something we are looking to build towards as we get closer to
              our public launch.
            </p>
          </Col>
          <Col sm={2} />
        </Row>

        <Row
          style={{
            marginBottom: '0px'
          }}
        >
          <Col sm={2} />
          <Col
            sm={8}
            style={{
              paddingTop: '20px'
            }}
          >
            <h4>What do you bring to the table that other's don't?</h4>
            <p>
              Our goal is never to bash any competing products, but focus on
              what Fableverse <strong>can</strong> do for you. We're creating a
              highly customizable engine, complete with a platform that allows
              you to market and build your userbase while accruing revenue,
              allowing for the extension and addition of new features, and most
              importantly - giving you the choice on how you want to build your
              masterpiece. We'll be debuting more of how this is done as time
              goes on.
            </p>
          </Col>
          <Col sm={2} />
        </Row>

        <center>
          <img
            src={Divider}
            style={{ width: '200px', marginTop: '30px' }}
            alt='a decrative divider'
          />
        </center>

        {/* ============= Special Thanks ============= */}
        <center>
          <h1 className='title'>SPECIAL THANKS</h1>
          <p>Thank you to all our Patrons that make this possible!</p>
          <Badge pill variant='primary'>
            Zethican
          </Badge>{' '}
          <Badge pill variant='primary'>
            Darius F
          </Badge>{' '}
          <br />
          <br />
          <br />
          <p>
            If you would like to support the project, check out our Patreon!
          </p>
          <a
            href='https://www.patreon.com/bePatron?u=11683626'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img
              src={PatreonButton}
              style={{ width: '200px', borderRadius: '8px' }}
              alt='Patreon button to support fableverse'
            />
          </a>
        </center>

        <center>
          <img
            src={Divider}
            style={{ width: '200px', marginTop: '30px' }}
            alt='a decrative divider'
          />
        </center>

        {/* ============= Beta ============= */}
        <div>
          <Row>
            <Col sm={3} />
            <Col sm={6}>
              <center>
                <img
                  id='beta'
                  src={Dragon}
                  style={{ width: '100%', marginTop: '00px' }}
                  alt='a purple dragon'
                />
              </center>
            </Col>
            <Col sm={3} />
          </Row>

          <Row>
            <Col sm={12}>
              <center>
                <h3 className='title'>BETA SIGN-UP</h3>
              </center>
            </Col>
          </Row>
          <Row>
            <Col sm={2} />
            <Col sm={8}>
              <center>
                <p
                  style={{
                    paddingBottom: '30px',
                    borderBottom: '1px solid rgba(129, 85, 220, .4)'
                  }}
                >
                  Fableverse is currently in Pre-Alpha. We will let you know
                  once Beta is open.
                </p>
              </center>
              <p
                style={{
                  paddingTop: '15px'
                }}
              >
                Email:
              </p>
              <Form.Control id='email' type='text' placeholder='Type here...' />
              <br />
              <p style={{ color: 'rgb(141, 138, 165)' }}>
                By signing up, you will receive news, updates and beta
                information about the game via email. You can unsubscribe at any
                time by sending an email to support@fableverse.com. For
                information about our privacy practices, see our{' '}
                <span style={{ color: 'rgb(129, 85, 220)' }}>
                  Privacy Policy.
                </span>
              </p>
            </Col>
            <Col sm={2} />
          </Row>
          <Row>
            <Col sm={12}>
              <center>
                <Button
                  style={{
                    marginBottom: '100px'
                  }}
                  onClick={handleSignup}
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className='icon'
                    style={{
                      color: '#fffff',
                      marginRight: '10px'
                    }}
                  />
                  Beta Sign-up
                </Button>
              </center>
            </Col>
          </Row>
        </div>
        <center>
          <h5 style={{ marginBottom: '50px' }}>
            Have a question or concern? Feel free to email us at{' '}
            <span style={{ color: 'rgb(129, 85, 220)' }}>
              hello@fableverse.com
            </span>
          </h5>
        </center>
      </Container>

      {/* ============= FOOTER ============= */}

      <Container fluid>
        <Row>
          <div
            style={{
              backgroundColor: 'rgb(46, 40, 89)',
              width: '100%',
              height: '60px'
            }}
          >
            <Container>
              <Row style={{ padding: '20px' }}>
                <Col>
                  <p style={{ color: 'white' }}>
                    Copyright &copy; Fableverse, LLC
                  </p>
                </Col>
              </Row>
            </Container>
          </div>
          <div
            style={{
              backgroundColor: 'white',
              width: '100%',
              height: '50px'
            }}
          >
            <Container>
              <Row style={{ padding: '20px' }}>
                <Col sm={10}>
                  <p style={{ color: 'rgb(141, 138, 165)' }}>
                    Privacy Policy | Terms and Conditions
                  </p>
                </Col>
                <Col sm={2}>
                  <p style={{ color: 'rgb(141, 138, 165)' }}>Press Kit</p>
                </Col>
              </Row>
            </Container>
          </div>
        </Row>
      </Container>

      <div id='snackbar'>Successfully added to beta list!</div>
    </div>
  )
}

export default Landing2
