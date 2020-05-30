import React, { useEffect, useState } from 'react'
import ImageOne from '../../../images/archer2.png'
import ImageTwo from '../../../images/monster.jpg'
import ImageThree from '../../../images/monster2.jpg'
import ImageFour from '../../../images/monster3.jpg'
import Dragon from '../../../images/dragon2.jpg'
import SS1 from '../../../images/ss1.png'
import PatreonButton from '../../../images/patreonbutton.png'

import {
  faDiscord,
  faRedditSquare,
  faTwitterSquare,
  faFacebookSquare,
  faYoutubeSquare,
  faTwitch,
  faGithubSquare
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import axios from 'axios'

let updatedStats = false

function Landing () {
  const [error, setError] = useState('')

  useEffect(() => {
    if (!updatedStats) {
      updatedStats = true
      axios.post('https://fableverse.com:8000/hit').catch(function (error) {
        console.log('Something went wrong with stats update.')
      })
    }
  }, [])

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
    }, 3000)
  }

  return (
    <div>
      <center>
        <h1>Fableverse</h1>
        <h4 style={{ marginBottom: '15px' }}>
          A web-based text MMORPG game engine.
        </h4>

        <br />
        <img
          src={ImageThree}
          style={{ height: '400px', marginTop: '30px' }}
          alt='a character with sword'
        />
        <img
          src={ImageFour}
          style={{ height: '400px', marginTop: '30px' }}
          alt='a character with sword'
        />
        <img
          src={ImageOne}
          style={{ height: '400px', marginTop: '30px' }}
          alt='a character with sword'
        />
        <img
          src={ImageTwo}
          style={{ height: '400px', marginTop: '30px' }}
          alt='a character with sword'
        />
        <br />
        {/* <h2
          style={{
            marginTop: '100px'
          }}
        >
          What might it look like?
        </h2> */}
        <img className='screenshot' src={SS1} alt='a character with sword' />
        <h3>
          <span style={{ fontWeight: '300', fontSize: '14px' }}>
            (A players perspective)
          </span>
        </h3>

        <h2 style={{ marginTop: '100px' }}>Why use the Fableverse Engine?</h2>
      </center>
      <div className='grid'>
        <div className='grid-item'>
          <h3>
            EASY <span style={{ fontWeight: '300' }}>To Use</span>
          </h3>
          <p>
            Every part of the process of making games has been automated for
            you. So there is no need to setup mutliplayer or the database
            yourself. We do it for you!
          </p>
        </div>
        <div className='grid-item'>
          <h3>
            <span style={{ fontWeight: '300' }}>Make Games</span> FAST
          </h3>
          <p>
            We have all the tools you need to get your games up and running
            fast. Within the engine, there is a suite of tools that makes every
            piece of the game, easy to create and put together.
          </p>
        </div>
        <div className='grid-item'>
          <h3>
            MULTIPLAYER{' '}
            <span style={{ fontWeight: '300' }}>out of the Box</span>
          </h3>
          <p>
            When using our engine, multiplayer is ready out of the box. You will
            have full control over what elements are provided, but things like
            chat rooms and pvp are all ready to go.
          </p>
        </div>
        <div className='grid-item'>
          <h3>
            SHARE <span style={{ fontWeight: '300' }}>your Games</span>
          </h3>
          <p>
            Once you have built your game, share it with your friends! With one
            Fableverse account, you can join any amount of games and create
            characters for each.
          </p>
        </div>
        <div className='grid-item'>
          <h3>
            <span style={{ fontWeight: '300' }}>A</span> MARKETPLACE
          </h3>
          <p>
            When you are ready to take it to the next level, share your game on
            our marketplace for everyone to see! We will even feature the best
            creations and have things like top games.
          </p>
        </div>
        <div className='grid-item'>
          <h3>
            <span style={{ fontWeight: '300' }}>Active</span> COMMUNITY
          </h3>
          <p>
            Join our active community on discord and get help with any of your
            needs. We are here to answer questions and hear your feedback. We
            want to build the best possible tool.
          </p>
        </div>
      </div>
      <center>
        <img
          src={Dragon}
          style={{ height: '200px', marginTop: '100px' }}
          alt='a character with sword'
        />
        <h2 style={{ marginTop: '0px', color: 'red' }}>
          Sign-up for Beta Access
        </h2>
        <p className='beta-text'>
          Once we are ready to open the doors to our first batch of users, you
          will be the first to know! Those who signup for the beta will get free
          access to the engine during the period.
        </p>

        <input type='text' id='email' placeholder='Email...' className='beta' />
        <button className='beta-button' onClick={handleSignup}>
          Sign-up
        </button>

        <p style={{ color: 'red', marginBottom: '50px' }}>{error}</p>
        <h3>A Special Thanks to Our Patrons!</h3>
        <p>Zethican, Darius F</p>
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

        <script
          async
          src='https://c6.patreon.com/becomePatronButton.bundle.js'
        ></script>

        <h2 style={{ margin: '0', padding: '0', marginTop: '50px' }}>
          Fableverse
        </h2>
        <a
          href='https://discord.gg/CvYy8M9'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon
            icon={faDiscord}
            size='2x'
            className='icon'
            style={{ margin: '10px', color: '#7289da' }}
          />
        </a>
        <a
          href='https://www.reddit.com/r/TheFableverse/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon
            icon={faRedditSquare}
            size='2x'
            className='icon'
            style={{ margin: '10px', color: '#FF5700' }}
          />
        </a>
        <a
          href='https://twitter.com/fableverse'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon
            icon={faTwitterSquare}
            size='2x'
            className='icon'
            style={{ margin: '10px', color: '#00ACEE' }}
          />
        </a>
        <a
          href='https://www.facebook.com/Fableverse-113275930368645'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon
            icon={faFacebookSquare}
            size='2x'
            className='icon'
            style={{ margin: '10px', color: '#3b5998' }}
          />
        </a>
        <a
          href='https://www.youtube.com/channel/UCwTeI4nUrlZDV6P2WqrK3Kg?view_as=subscriber'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon
            icon={faYoutubeSquare}
            size='2x'
            className='icon'
            style={{ margin: '10px', color: '#FF0000' }}
          />
        </a>
        <a
          href='https://github.com/Fableverse'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon
            icon={faGithubSquare}
            size='2x'
            className='icon'
            style={{ margin: '10px', color: '#211F1F' }}
          />
        </a>
        <a
          href='https://www.twitch.tv/fableverse'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FontAwesomeIcon
            icon={faTwitch}
            size='2x'
            className='icon'
            style={{ margin: '10px', color: '#6441a5' }}
          />
        </a>
        <p>&copy; 2020 Fableverse, LLC</p>
      </center>
      <div id='snackbar'>Successfully added to beta list!</div>
    </div>
  )
}

export default Landing
