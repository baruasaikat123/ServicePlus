import './service.css'
import {
  ButtonN,
  RouteHeading,
  Routediv,
  RouteLinkContainer,
  RouteLinks
}
from '../../style'
import { useParams } from 'react-router-dom'
import { categoryMap } from './categoryItems'
import { db } from '../../utils/init-firebase'
import { arrayUnion, collectionGroup, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { useAuth } from '../../contexts/AuthContext'
import Profilebar from '../../components/profilebar/Profilebar'
import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import { monthMap } from '../../constants'
import Calender from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { AiFillStar } from 'react-icons/ai'
import Address from '../../components/selectAddress/Address'
import FeedbackComponent from '../../components/Feedback/FeedbackComponent'
//import 'react-notifications/lib/notifications.css';
//import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import ProfilePic from '../../images/my.jpg'

const ServiceInfo = () => {

  const [serviceInfo, setServiceInfo] = useState([])
  const [date, setDate] = useState(null)
  const [bookingDate, setBookingDate] = useState('')
  const [requestSent, setRequestSent] = useState(false)
  const [isActive, setIsActive] = useState(true)
  const [bookings, setBookings] = useState([])
  const [isBooked, setIsBooked] = useState(false)
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectAddress, setSelectAddress] = useState([])
  const [addressClick, setAddressClick] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const params = useParams()
  const categoryId = params.categoryId
  const serviceId = params.serviceId
  const today = new Date()
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  const { currentUser } = useAuth()

  const requestSend = () => {

    if (!date) {
      toast.error('select a date first', {
        autoClose: 2000
      })
      return
    }
    if (!deliveryAddress) {
      toast.error('select a address first', {
        autoClose: 2000
      })
      return
    }

    const ref = doc(db, 'services', serviceId)
    updateDoc(ref, {
      requests: arrayUnion({
        requestId: currentUser.uid,
        bookingDay: date,
        location: deliveryAddress
      })
    }).then(() => {
      console.log('added')
      toast.success('A request has been sent to the provider. Please wait for the response from the provider!', {
        autoClose: 3000
      })
    })
    .catch(err => console.log(err.code))
  }

  useEffect(() => {

    if (!currentUser) return
    
    const ref = doc(db, 'services', serviceId)
    const unsubscribe = onSnapshot(ref, snapshot => {
      if(snapshot.data().status === 'N') setIsActive(false)
      setServiceInfo(snapshot.data())
      setRequests(snapshot.data().requests)
      setLoading(false)
    })


    return () => unsubscribe()

  }, [currentUser])

  useEffect(() => {

    if (!currentUser) return
    
    const ref = doc(db, 'users', currentUser.uid)
    const unsubscribe = onSnapshot(ref, snapshot => {
      setSelectAddress(snapshot.data().location)
      setBookings(snapshot.data().bookingId)
    })
    return () => unsubscribe()

  }, [currentUser])
  
  useEffect(() => {
    if (requests.length === 0) return
    
    for (let i = 0; i < requests.length; i++){
      if (requests[i].requestId === currentUser.uid) {
        setRequestSent(true)
        break
      }
    }
  }, [requests])


  
  useEffect(() => {

    if (bookings.length === 0) return
    
    for (let i = 0; i < bookings.length; i++){
      if (bookings[i] === serviceId) {
        //const d = bookings[i].bookedAt.toDate()
        //setBookingDate(monthMap[d.getMonth()] + ' ' + d.getDate() + ' , ' + d.getFullYear())
        setIsBooked(true)
        break
      }
    }
  }, [bookings])

  console.log(bookings);


  if (loading) return <Loading />


  return (
    <>
      <Profilebar />
      <Routediv>
        <RouteHeading>
          <h2>Service Details</h2>
        </RouteHeading>
        <RouteLinkContainer>
          <RouteLinks to='/'><p>Home</p></RouteLinks>
          <p>&nbsp;/&nbsp;</p>
          <RouteLinks to="/services/category">Category</RouteLinks>
          <p>&nbsp;/&nbsp;</p>
          <RouteLinks to={`/services/category/${categoryId}`}>{categoryMap[categoryId]}</RouteLinks>
          <p>&nbsp;/&nbsp;</p>
          <p>Details</p>
        </RouteLinkContainer>
      </Routediv>
      {addressClick && <Address setAddressClick={setAddressClick} />}
      <div className='service-container'>
        <div className='service-info-container'>
          <div className='service-info-heading'> 
            {/* <h1>{serviceInfo.serviceInfo}</h1> */}
            <div className='service-user-info'>
              <img src={ ProfilePic } alt={'profile-pic'} />
              <h5 style={{padding: '15px'}}>{serviceInfo.displayName}</h5>
            </div>
          </div>
          <div className='service-detail-conatiner'>
            <h3>Service Detail</h3>
            <p>welcome to my service profile. Plase read before placing order. I will design concept for your brand. And if you have any reference just tell me already
              Why choose me? On time, Easy to contact, Will take your vision and make it come true
              All my design with commersial use, so you can use for anything
            I offer original, special & high-quality designs! High resolution print-ready.
              Please contact me before ordering to set up a details of your idea!
              if you have already a concept in your mind, just tell me. we will do it
              Feel free to contact me if you interested to make project with me :)
            </p>
            <h4>Fees<span>{serviceInfo.fees}</span></h4>
          </div>
          <div className='service-provider-about'>
            <h3>About Service Provider</h3>
            <h5 style={{color: 'var(--app-red)', fontWeight: 'bold'}}>From<pre>{serviceInfo.location.city}, {serviceInfo.location.state}</pre></h5>
            <h5 style={{color: 'var(--app-red)', fontWeight: 'bold'}}>Member Since<pre>Apri,2022</pre></h5>
          </div>
          <div className="service-feedback">
            <h2>Customer Feedback</h2>
            <FeedbackComponent serviceId={serviceId} />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className='service-additional-info'>
            <div>
              <h4 style={{color: 'var(--app-red)', fontWeight: 'bold', fontSize: '18px'}}>Choose delivery date</h4>
              <Calender
                onChange={(date) => setDate(date)}
                value={date}
                // tileClassName={({ d, view }) => {
                //   if(mark.find(x=>x===moment(d).format("DD-MM-YYYY"))){
                //   return  'highlight'
                //   }
                // }}
                tileDisabled={({ date }) => date.getDate() === today.getDate() && date.getMonth()=== today.getMonth() && date.getFullYear() === today.getFullYear()}
                minDate={today}
                maxDate={maxDate}
              />
            </div>
            <div style={{paddingTop: '20px'}}>
              <h4 style={{color: 'var(--app-red)', fontWeight: 'bold', fontSize: '18px', marginTop: '20px'}}>Available days</h4>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {serviceInfo.days && serviceInfo.days.map((day, key) => (
                  <p style={{background: 'rgba(0,0,0,0.5)', padding:'8px 15px', color: 'white', borderRadius: '8px', fontSize: '17px'}} key={key}>{day}</p>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{color: 'var(--app-red)', fontWeight: 'bold', fontSize: '18px', marginTop: '20px'}}>Select Address</h4>
              {selectAddress.length > 0 && selectAddress.map((add,key) => (
                <div key={key} style={{paddingBottom: '20px'}}>
                  <input type='radio' name='address' value={add} onChange={(e) => setDeliveryAddress(e.target.value)} />
                  <label style={{paddingLeft: '10px'}}>{add}</label>
                </div>
              ))}
              <ButtonN onClick={() => setAddressClick(true) } style={{background: 'var(--app-red)', color: 'white', margin: '25px'}}>Add address</ButtonN>
            </div>
          </div>
          <div className='service-add'>
            <ButtonN disabled={requestSent || isBooked || !isActive && 'enable'} onClick={requestSend} className={requestSent || isBooked || !isActive ? 'service-add-btn disable' : 'service-add-btn'}>{requestSent ? 'A request is generated' : isBooked ? 'Already booked' : 'Book Service'}</ButtonN>
            {/* {isBooked && <div className='booked-at'>booked on - &nbsp; {bookingDate}</div>} */}
            <ToastContainer position={toast.POSITION.TOP_CENTER} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ServiceInfo