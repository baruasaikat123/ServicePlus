import './myService.css'
import FabMenu from '../../components/FabMenu/FabMenu'
import Sidebar from '../../components/sidebar/Sidebar'
import { useState, useEffect } from 'react'
import AddService from './AddService'
import { getState } from '../../apis/location'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'
import MyServiceCard from '../../components/card/MyServiceCard'
import { query, where, getDocs, collection } from 'firebase/firestore'
import { db } from '../../utils/init-firebase'
import Loading from '../../components/Loading'
import Pagination from '../../components/pagination/Pagination'
import DeleteModal from '../../components/modal/DeleteModal'
import { onSnapshot } from 'firebase/firestore'
import Profilebar from '../../components/profilebar/Profilebar'

const ServiceForm = () => {


  const [click, setClick] = useState(false)
  const [deleteClick, setDeleteClick] = useState(false)
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState([])
  const [noService, setNoService] = useState(false)
  const [pageNumber, setPageNumber] = useState(0)

  const { stateMap, stateNames, currentUser, currentServiceId, requestNo} = useAuth()

  
  useEffect(() => {
    document.title = 'My Services'
  },[])
 

  useEffect(async () => {
    const headers = {
      'X-CSCAPI-KEY': 'OHA4MXJnWEJQalBFRkIzVkNoUjV2VWxtZ2dOYkJwR082Ym44N20ySA=='
    }

    try {
      const { data } = await axios.get(getState(), {
        headers: headers
      })
      data.map(state => { 
        stateNames.push(state.name)
        stateMap.set(state.name, state.iso2)
      })
    }
    catch (e) {
      console.log(e)
    }
  }, [])




  const servicesPerPage = 6
  const pagesVisited = pageNumber * servicesPerPage

  const displayServices = services
  .slice(pagesVisited, pagesVisited + servicesPerPage)
  .map((service,key) => {
    return <MyServiceCard key={key} service={service} setDeleteClick={setDeleteClick} />
  })

  const pageCount = Math.ceil(services.length / servicesPerPage)
  
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  useEffect(() => {
    if (!currentUser) return
    
    const ref = collection(db, 'services')
    const q = query(ref, where('userId', '==', currentUser.uid))

    const unsubscribe = onSnapshot(q, snapshot => {

      if (snapshot.docs.length === 0) {
        setLoading(false)
        setNoService(true)
        return
      }
      const getServices = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))

      setServices(getServices)
      setLoading(false)
      setNoService(false)
    })

    return () => { unsubscribe() }
  
  }, [currentUser])


  return (
    <>
      <Profilebar />
        <div className='my-service-main'>
          <Sidebar />
          {click && <AddService setClick={setClick} /> }
          <div className='my-service-fab-menu'>
            <FabMenu setClick={setClick} />
          </div>
          {deleteClick &&
            <DeleteModal
              setDeleteClick={setDeleteClick}
              serviceId={currentServiceId} 
            />}  
          {loading ? <div className="my-service-loading"><Loading /></div> : noService ?
             <div className='my-service-not-added'><h4>Nothing added yet.🙁</h4></div> :
             <div className="my-service-box-container">
               {displayServices}
             </div>
           }
        </div>
        {!loading && !noService && <div className="fav-services-pagination-container">
          <Pagination changePage={changePage} pageCount={pageCount} />
        </div>}
    </>
   
    // <>
    //   <Profilebar /> 
    //   <div style={{display: 'flex'}}>
    //       <Sidebar />
    //       {click && <AddService setClick={setClick} /> }
    //       <div className='my-service-fab-menu'>
    //         <FabMenu setClick={setClick} />
    //       </div>
    //       {deleteClick && <DeleteModal setDeleteClick={setDeleteClick}
    //         serviceId={currentServiceId} />}  
    //       {loading ? <div className="my-service-loading"><Loading /></div> : noService ?
    //         <div className='my-service-not-added'><h4>Nothing added yet.🙁</h4></div> :
    //         <div className="my-service-box-container">
    //           {displayServices}
    //         </div>
    //       }
         
    //   </div>
    //   <div className="my-service-pagination-container">
    //     <Pagination changePage={changePage} pageCount={pageCount} />
    //   </div>
    // </>
  
  )
}

export default ServiceForm