import { useEffect, useState } from 'react'
import HeroSection from '../components/heroSection/HeroSection'
import Navbar from '../components/navbar/Navbar'
import Profilebar from '../components/profilebar/Profilebar'
import { useAuth } from '../contexts/AuthContext'
import About from './About'
import Loading from '../components/Loading'
import Footer from '../components/footer/Footer'

const Home = () => {

  const [loading, setLoading] = useState(true)

  const {currentUser} = useAuth()

  useEffect(() => {
    document.title = 'SERVICEPLUS'
    setTimeout(() => setLoading(false), 1000)

    return () => setLoading(false)
  }, [])

  if(loading) return <Loading />
  
  return (
    <>
      {currentUser ?<Profilebar /> : <Navbar />}
      <HeroSection />
      <About />
      <Footer />
    </>
   
  )
}

export default Home