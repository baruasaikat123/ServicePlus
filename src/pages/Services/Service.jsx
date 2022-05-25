import ServiceCard from "../../components/card/ServiceCard"
import { useState, useEffect } from "react"
import { onSnapshot, collection, query, where, doc, getDocs } from "firebase/firestore"
import { db } from '../../utils/init-firebase.js'
import './service.css'
import { Routediv, RouteLinks, RouteLinkContainer, RouteHeading, AppLoader, Input, ButtonN } from "../../style"
import { useParams } from "react-router-dom"
import { categoryMap } from "./categoryItems"
import Loading from "../../components/Loading"
import Pagination from "../../components/pagination/Pagination"
import Navbar from "../../components/navbar/Navbar"
import { useAuth } from "../../contexts/AuthContext"
import Profilebar from "../../components/profilebar/Profilebar"


const Service = () => {


  const { currentUser, favMap } = useAuth()
  const params = useParams()
  const categoryId = params.categoryId
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [pageNumber, setPageNumber] = useState(0)
  const [searchPin, setSerchPin] = useState(false)
  const [searchByPinBtn, setSearchByPinBtn] = useState(false)
  const [pin, setPin] = useState(0)


  const handleSearchPin = () => {
    setSerchPin(!searchPin)
  }


  const servicesPerPage = 10
  const pagesVisited = pageNumber * servicesPerPage

  const displayServices = services
    .slice(pagesVisited, pagesVisited + servicesPerPage)
    .map((service) => {
      return <ServiceCard key={service.id} service={service} />
    })
  
  const pageCount = Math.ceil(services.length / servicesPerPage)
  
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  useEffect(() => {

    setServices([])

    let ref = collection(db, 'services')
    
    if (currentUser) {
      ref = query(ref, where('userId', '!=', currentUser.uid), where('category', '==', categoryId))
    }

    else {
      ref = query(ref, where('category', '==', categoryId))
    }

    
    const unsubscribe = onSnapshot(ref, snapshot => {
   
      const getServices = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))

      setServices(getServices)
      setLoading(false)
    })

    return () => { unsubscribe() }
  
  }, [currentUser, searchByPinBtn === true])
  


  
  useEffect(() => {

    if (!currentUser) return
  
    const ref = doc(db, 'users', currentUser.uid)
      
    const unsubscribe = onSnapshot(ref, snapshot => {
      const getFavs = snapshot.data().fav
      getFavs.map(favData => favMap.set(favData, true))
    })
      
    return () => unsubscribe()
    
  }, [currentUser])

  const handleSearch = () => {
    if (pin === 0 || !pin) {
      alert('please enter a pincode')
      return
    }

    let pinArr = []

    pinArr.push(Number(pin) - 2)
    pinArr.push(Number(pin) - 1)
    pinArr.push(Number(pin))
    pinArr.push(Number(pin) + 1)
    pinArr.push(Number(pin) + 2)
    

    setLoading(true)
    setSerchPin(false)
    setServices([])
    const ref = collection(db, 'services')
    const q = query(ref, where('userId', '!=', currentUser.uid), where('category', '==', categoryId), where('location.pin', 'in', pinArr))

    getDocs(q)
      .then((res) => {
        const getServices = res.docs.map(doc => ({
          id: doc.id,
          data: doc.data()
        }))
  
        setServices(getServices)
      })
      .catch(err => console.log(err.code))
    .finally(() => setLoading(false))
  }


  
  if (loading) return <Loading />
    
  return (
    <div className="service-wrapper">
      {currentUser ? <Profilebar /> : <Navbar />}
      <Routediv className='service-wrapper'>
        <RouteHeading>
          <p style={{fontSize: '22px', fontWeight: 'bold'}}>{categoryMap[categoryId]}&nbsp;Services</p>
        </RouteHeading>
        <RouteLinkContainer>
          <RouteLinks to='/'><p>Home</p></RouteLinks>
          <p>&nbsp;/&nbsp;</p>
          <RouteLinks to="/services/category">Category</RouteLinks>
          <p>&nbsp;/&nbsp;</p>
          <p>{categoryId}</p>
        </RouteLinkContainer>
      </Routediv>
      <div style={{display: 'flex', margin: '25px'}}>
        <div className="service-search-pincode" onClick={handleSearchPin}>Want to search by pincode ?</div>
        {searchPin &&
          <div style={{display: 'flex'}}>
            <Input type='number' value={pin} onChange={(e) => setPin(e.target.value)}/>
            <div style={{padding: '4px 0px'}}>
              <ButtonN onClick={handleSearch} className="service-search-btn">Search</ButtonN>
              <label onClick={() => setSerchPin(false) } className="service-search-cancel">X</label>
            </div>
          </div>
          }
      </div>
      <div className="box-container">
        {displayServices}
      </div>
      <div className="pagination-container">
        <Pagination changePage={changePage} pageCount={pageCount} />
      </div>
    </div>
  )
}

export default Service