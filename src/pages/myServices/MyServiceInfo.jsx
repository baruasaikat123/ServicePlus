import './myServiceInfo.css'
import { useParams } from 'react-router-dom'
import { db } from '../../utils/init-firebase'
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { BookingRequestCard } from '../../components/card/BookingRequestCard'
import { useAuth } from '../../contexts/AuthContext'
import RequestModal from '../../components/serviceRequest/RequestModal'
import Loading from '../../components/Loading'
import Profilebar from '../../components/profilebar/Profilebar'
import { useLocation} from 'react-router-dom'

const MyServiceInfo = () => {

  const { currentRequestId, handleRejectNo, deliveryDate, deliveryLocation} = useAuth()
  
  const params = useParams()
  const serviceId = params.serviceId
  const [service, setService] = useState([])
  const [requests, setRequests] = useState([])
  const [requestIds, setRequestIds] = useState([])
  const [loading, setLoading] = useState(true)
  const [noRequest, setNoRequest] = useState(false)
  const [users, setUsers] = useState([])
  const [acceptClick, setAcceptClick] = useState(false)
  const [rejectClick, setRejectClick] = useState(false)

  //const location = useLocation()

  


  useEffect(() => {
    //console.log(location.pathname);
    const ref = doc(db, 'services', serviceId)
    const unsubscribe = onSnapshot(ref, snapshot => {
      if (snapshot) {
        setService(snapshot.data())
        setRequests(snapshot.data().requests)
        handleRejectNo(snapshot.data().rejectNo)
        setLoading(false)
      }
    })

    return () => unsubscribe()

  }, [])

  useEffect(() => {

    if (requests.length === 0) {
      setNoRequest(true)
      return
    }

    setNoRequest(false)
    
  },[requests])


  /*useEffect(() => {

    if (requests.length===0) {
      setLoading(false)
      setNoRequest(true)
      return
    }
    setNoRequest(false)

    for (let i = 0; i < requests.length ; i++){
      requestIds.push(requests[i].requestId)
    }

  },[requests])*/


  /*useEffect(() => {

    if(requests.length===0) return

    for (let i = 0; i < requests.length ; i++){
      setRequestIds(requests[i].requestId)
    }

    /*if (requestIds.length === 0) {
      setLoading(false)
      setNoRequest(true)
      return
    }

    setNoRequest(false)

    const docRef = collection(db, 'users')
    const q = query(docRef, where('__name__', 'in', requestIds))

    const unsubscribe = onSnapshot(q, snapshot => {
      const getUsers = snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
        setUsers(getUsers)
    })
    setLoading(false)

    return () => unsubscribe()

  }, [requests])*/

  //console.log(requestIds);


  

  return (
    <>
      <Profilebar />
      {(acceptClick || rejectClick) &&
          <RequestModal
            acceptClick={acceptClick}
            setAcceptClick={setAcceptClick}
            setRejectClick={setRejectClick}
            serviceId={serviceId}
            rid={currentRequestId}
            deliveryDate={deliveryDate}
          />}
      <div className='service-container'>
        <div className='service-info-container'>
          <div className='service-info-heading'> 
            <h1>{''}</h1>
            <div className='service-user-info'>
              <img alt={'profile-pic'} />
              <p>{service.displayName}</p>
            </div>
          </div>
          <div className='service-detail-conatiner'>
            <h4>Service Detail</h4>
            <p>welcome to my service profile. Plase read before placing order. I will design concept for your brand. And if you have any reference just tell me already
              Why choose me? On time, Easy to contact, Will take your vision and make it come true
              All my design with commersial use, so you can use for anything
            I offer original, special & high-quality designs! High resolution print-ready.
              Please contact me before ordering to set up a details of your idea!
              if you have already a concept in your mind, just tell me. we will do it
              Feel free to contact me if you interested to make project with me :)
            </p>
            <h4>Fees</h4>
            <p style={{fontSize: '18px'}}>&#8377;&nbsp;{service.fees}</p>
          </div>
          <div className='service-provider-about'>
            <h4>About Service Provider</h4>
            <p>From<pre>{service.location && service.location.city}, {service.location && service.location.state}</pre></p>
            <p>Member Since<pre>April,2022</pre></p>
          </div>
        </div>
        
      
        <div className='my-service-request-container'>
          <h3>Your service requests are shown here:</h3>
          {loading ? <Loading /> : noRequest ? <h4>No data</h4> :
            <div className="my-service-request">
            {requests.length > 0 && requests.map((request,key) => (
              <BookingRequestCard key={key} request={request}
                acceptClick={acceptClick}
                setAcceptClick={setAcceptClick}
                setRejectClick={setRejectClick} />
            ))}
          </div>}
        </div>
      </div>
    </>
  )
}

export default MyServiceInfo