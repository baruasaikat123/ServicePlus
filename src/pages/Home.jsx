import React, { useEffect } from 'react'
import HeroSection from '../components/heroSection/HeroSection'
import About from './About'

const Home = () => {

  useEffect(() => {
    document.title = 'ServicePlus'
  }, [])
  
  return (
    <>
      <HeroSection />
      <About />
    </>
   
  )
}

export default Home