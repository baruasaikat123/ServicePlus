import {useEffect, useState} from 'react'
import WorkInfo from '../components/workInfo/WorkInfo'
import './about.css'
import * as RegisterAnimation from '../lottie/register.json'
import * as SearchAnimation from '../lottie/search.json'
import * as BookService from '../lottie/book_service.json'
import Loading from '../components/Loading'
import { useAuth } from '../contexts/AuthContext'
import Navbar from '../components/navbar/Navbar'
import Profilebar from '../components/profilebar/Profilebar'

const About = () => {

  const [loading, setLoading] = useState(true)

  const { currentUser } = useAuth()

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)

    return () => setLoading(false)
  }, [])

  if(loading) return <Loading />

  const items = [
    {
      animation: RegisterAnimation,
      heading: '1. Register & Complete Profile',
      description: 'Free signup with a valid Email ID or Mobile No. Complete or Update your profile before visible to public.'
    },
    {
      animation: SearchAnimation,
      heading: '2. Search Services',
      description: 'Search services based on categories in your area.'
    },
    {
      animation: BookService,
      heading: '3. Book Services',
      description: 'Book services of your choice in a easy way.'
    },

  ]
  return (
    <>
    <div style={{marginTop: '30px'}}>
      <div className='about-heading-container'>
        <h2>How does it work ?</h2>
      </div>
      <div className='about-info-container'>
        {items.map((item, key) => (
          <WorkInfo key={key} item={item} />
        ))}
      </div>
    </div></>
  )
}

export default About