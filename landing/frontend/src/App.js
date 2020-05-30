import React from 'react'
import './App2.css'

import AOS from 'aos'
import 'aos/dist/aos.css'

// import Landing from './components/pages/landing/landing'
import Landing2 from './components/pages/landing2/landing2'

function App () {
  AOS.init({ duration: 1000 })

  return (
    <div>
      <Landing2 />
    </div>
  )
}

export default App
