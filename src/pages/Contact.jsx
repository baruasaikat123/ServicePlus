import { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/navbar/Navbar'

const Contact = () => {

  const [loading, setLoading] = useState(false)
  const {currentUser} = useAuth()
  console.log(currentUser);

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000)
  // }, []);
  


  useEffect(() => {
    document.title = 'Contact page'
  }, [])

  if(loading) return <Loading />
  
  return (
    <><Navbar />
      <div>Contact page</div>
    </>
    
  )
}

export default Contact