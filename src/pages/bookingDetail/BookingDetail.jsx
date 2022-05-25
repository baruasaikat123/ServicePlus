import Profilebar from '../../components/profilebar/Profilebar'
import Sidebar from '../../components/sidebar/Sidebar'
import Pagination from '../../components/pagination/Pagination'
import { useState, useEffect } from 'react'
import { db } from '../../utils/init-firebase'
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
import { useAuth } from '../../contexts/AuthContext'
import BookingDetailCard from './BookingDetailCard'
import Loading from '../../components/Loading'
import Feedback from '../../components/Feedback/Feedback'

const BookingDetail = () => {

  const { currentUser } = useAuth()

  const [pageNumber, setPageNumber] = useState(0)
  const [mp, setMp] = useState(new Map())
  const [bookings, setBookings] = useState([])
  const [bookingIds, setBookingIds] = useState([])
  const [loading, setLoading] = useState(true)
  const [services, setServices] = useState([])
  const [noBooking, setNoBooking] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  
  const servicesPerPage = 6
  const pagesVisited = pageNumber * servicesPerPage

  const displayServices = services
    .slice(pagesVisited, pagesVisited + servicesPerPage)
    .map((service) => {
      return <BookingDetailCard key={service.id} service={service} deliveryOn={mp.get(service.id)[1]} bookedOn={mp.get(service.id)[0]} setShowFeedback={setShowFeedback}/>
  })

  const pageCount = Math.ceil(services.length / servicesPerPage)
  
  const changePage = ({ selected }) => {
    setPageNumber(selected)
  }

  
  useEffect(() => {
    document.title = 'My Booking Detail'
  },[])

  useEffect(() => {
    if (!currentUser) return
    
    //const ref = doc(db, 'users', currentUser.uid)
    const ref = collection(db, 'booking_history')
    const q = query(ref, where('bookedBy', '==', currentUser.uid))

    const unsubscribe = onSnapshot(q, snapshot => { 

      if (snapshot.docs.length === 0) {
        setNoBooking(true)
      }
      else {

        const getData = snapshot.docs.map(doc => ({
          data: doc.data(),
          id: doc.id
        }))
          
        setBookings(getData)
      }

      setLoading(false)
    })

    /*const unsubscribe = onSnapshot(ref, snapshot => {
      setBookings(snapshot.data())
    })*/

    return () => { unsubscribe() }
  
  }, [currentUser])


  useEffect(() => {
    

    for (let i = 0; i < bookings.length; i++){
      bookingIds.push(bookings[i].data.bookedFor)
      mp.set(bookings[i].data.bookedFor, [bookings[i].data.bookedOn.toDate(), bookings[i].data.deliveryOn.toDate()])
      //mp2.set(bookings[i].bookedFor, bookings[i].deliveryOn.toDate())
    }

    if (bookingIds.length === 0) {
      setLoading(false)
      setNoBooking(true)
      return
    }

    setNoBooking(false)

    let ref = collection(db, 'services')
    const q = query(ref, where('__name__', 'in', bookingIds))
    
    const unsubscribe = onSnapshot(q, snapshot => {

      const getServices = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
      setServices(getServices)
     
    })

    return () => { unsubscribe() }

  }, [bookings])
  
  console.log(bookingIds);



  /*useEffect(() => {
    

    for (let i = 0; i < bookings.length; i++){
      bookingIds.push(bookings[i].bid)
      mp.set(bookings[i].bid, [bookings[i].bookedAt.toDate(), bookings[i].deliveryOn.toDate()])
      //mp2.set(bookings[i].bid, bookings[i].deliveryOn.toDate())
    }

    if (bookingIds.length === 0) {
      setLoading(false)
      setNoBooking(true)
      return
    }

    setNoBooking(false)

    // bookings.map(b => {
    //   bookingIds.push(b.bid)
    //   mp.set(b.bid, b.bookedAt.toDate())
    // })
    
    let ref = collection(db, 'services')
    const q = query(ref, where('__name__', 'in', bookingIds))
    
    const unsubscribe = onSnapshot(q, snapshot => {

      const getServices = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
      setServices(getServices)
     
    })

    return () => { unsubscribe() }
  
  }, [bookings])*/

  if (loading) return <Loading />
  
 


  return (
    <>
      <Profilebar />
      {showFeedback && <Feedback setShowFeedback={setShowFeedback}  />}
      <div style={{ display: 'flex' }}>
        <Sidebar />
        {
        noBooking ?
        <div className='fav-services-no-request'><h4>Nothing added yet.🙁</h4></div>
          :
          <div className="fav-services-container">
            {displayServices}
          </div>
      }
      </div>
      <div className="fav-services-pagination-container">
        <Pagination changePage={changePage} pageCount={pageCount} />
      </div>
    </>
  )
}

export default BookingDetail