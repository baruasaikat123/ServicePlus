import './favservice.css'
import ServiceCard from '../../components/card/ServiceCard'
import { collection, doc, getDoc, getDocs, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../../utils/init-firebase'
import { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Loading from '../../components/Loading'
import { useAuth } from '../../contexts/AuthContext'
import FavServiceCard from './FavServiceCard'
import Pagination from '../../components/pagination/Pagination'
import Profilebar from '../../components/profilebar/Profilebar'

const FavService = () => {

  const { currentUser } = useAuth()
  const [favs, setFavs] = useState([])
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [noFav, setNofav] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)

  const servicesPerPage = 10
  const pagesVisited = pageNumber * servicesPerPage

  const displayServices = services
    .slice(pagesVisited, pagesVisited + servicesPerPage)
    .map((service) => {
      return <FavServiceCard key={service.id} service={service} />
    })
  
  const pageCount = Math.ceil(services.length / servicesPerPage)
  
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  
  useEffect(() => {
    document.title = 'Favourite Service'
  },[])


  useEffect( () => {

    if(!currentUser) return
    
    const ref = doc(db, 'users', currentUser.uid)
    const unsubscribe = onSnapshot(ref, snapshot => {
     
      const getFavs = snapshot.data().fav
      setFavs(getFavs)
    })
    return () => unsubscribe()
    
  }, [currentUser])

  


  useEffect(() => {
    
    if (favs.length === 0) {
      setLoading(false)
      setNofav(true)
      return
    }

    setNofav(false)
    
    let ref = collection(db, 'services')
    const q = query(ref, where('__name__', 'in', favs))
    
    const unsubscribe = onSnapshot(q, snapshot => {

      const getServices = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
      setServices(getServices)
      //setLoading(false)
     
    })

    setLoading(false)

    return () => { unsubscribe() }
  
  }, [favs])



  return (
    <>
      <Profilebar />
      <div className='my-service-main'>
        <div><Sidebar /></div>
      {loading ? <Loading /> :
        noFav ?
        <div className='fav-services-no-request'><h4>Nothing added yet.🙁</h4></div>
          :
          <div className="fav-services-container">
            {displayServices}
          </div>
      }
    </div>
    {!loading && !noFav && <div className="fav-services-pagination-container">
      <Pagination changePage={changePage} pageCount={pageCount} />
    </div>} 
      
  </>
    
  )
}

export default FavService