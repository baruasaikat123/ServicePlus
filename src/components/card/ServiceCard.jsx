import './serviceCard.css'
import { BsFillStarFill } from 'react-icons/bs'
import { AiFillHeart } from 'react-icons/ai'
import { GoPrimitiveDot } from 'react-icons/go'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { db } from '../../utils/init-firebase'
import { doc, updateDoc, arrayRemove, arrayUnion, getDoc } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import ProfilePic from '../../images/my.jpg'
import ServicePic from '../../images/default.png'

const ServiceCard = ({ service }) => {

  const { favMap } = useAuth()
  const [favClick, setFavClick] = useState(false)
  const [addFav, setAddFav] = useState(false)
  const { category, gender, displayName, experience, fees, location, serviceDetail, serviceInfo, status, totalRating} = service.data
  const history = useHistory()
  const params = useParams()
  const categoryId = params.categoryId

  const addToFav = () => {
    const ref = doc(db, 'users', currentUser.uid)
    if (!favClick) {
      updateDoc(ref, {
        fav:arrayUnion(service.id)
      }).then(() => {
        setFavClick(true)
        console.log('added')
      })
      .catch(err => console.log(err.code))
    }

    else {
      updateDoc(ref, {
        fav:arrayRemove(service.id)
      }).then(() => {
        setFavClick(false)
        console.log('remove')
      })
      .catch(err => console.log(err.code))
    }
  }

  useEffect(() => {

    if (addFav) addToFav()
    
    return () => setAddFav(false)

  },[addFav])
  
  useEffect(() => {
    if(favMap.get(service.id)) setFavClick(true)
  },[favMap.get(service.id)])


  const { currentUser, handleAuthModal } = useAuth()

  const check = () => {
    if (currentUser) {
      history.push(`/services/category/${categoryId}/${service.id}`)
    }
    else {
      handleAuthModal(true)
    }
  }


  return (
    <div className="service-card-container">
      <div className="card-pic">
        <img src={ ServicePic } alt={'service-pic'} />
      </div> 
      <div className="service-card-body" onClick={check}>
        <div className="service-card-profile">
          <img src={ProfilePic} alt={'profile-pic'} />
          <p>{displayName}</p>
          <GoPrimitiveDot className={status === 'A' ? 'icon-available' : 'icon-notavailable'} />
        </div>    
        <div className="service-card-description">
          <p>{ serviceInfo }</p>
        </div>  
        <div className='card-rating'>
          <BsFillStarFill className='rating-logo' />
          <p>{ totalRating.avgRating }<span>({ totalRating.totalNoUser})</span></p>
        </div>
      </div>  
      <div className="service-card-footer">
        {currentUser ? 
          <>
            <AiFillHeart
              onClick={() => setAddFav(true) }
              className={favClick ? 'card-fav-logo-active' : 'card-fav-logo'} />
            
            <h5>&#x20B9;&nbsp;{ fees }</h5>
          </> : <h5>Register to view</h5>
        }
      </div>  
    </div>
  )
}

export default ServiceCard