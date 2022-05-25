import { BsFillStarFill } from 'react-icons/bs'
import { useParams, useHistory } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import './bookingDetailCard.css'
import { monthMap } from '../../constants'
import { ButtonN } from '../../style'
import { useEffect, useState } from 'react'
import Feedback from '../../components/Feedback/Feedback'
import ProfilePic from '../../images/my.jpg'
import ServicePic from '../../images/default.png'

const BookingDetailCard = ({ service, bookedOn, deliveryOn, setShowFeedback }) => {

    const { currentUser, handleServiceId, handleRating } = useAuth()

       
    const history = useHistory()
    const params = useParams()
    const categoryId = params.categoryId

    const { category, gender, displayName, experience, fees, location, serviceDetail, serviceInfo, totalRating } = service.data
    //const { bookedOn, deliveryOn } = booking.data

    const getBookingDate = () => {
        const bookedAt = monthMap[bookedOn.getMonth()] + " " + bookedOn.getDate() + ", " + bookedOn.getFullYear()

        return bookedAt
    } 

    const getDeliveryDate = () => {
        const deliveryAt = monthMap[deliveryOn.getMonth()] + " " + deliveryOn.getDate() + ", " + deliveryOn.getFullYear()

        return deliveryAt
    }
    
    const hanldeFeedback = () => {
        handleServiceId(service.id)
        setShowFeedback(true)
        handleRating(totalRating)
    }

    

    return (
        <div className="fav-service-card-container">
            <div className="card-pic">
                <img src={ServicePic} alt={'service-pic'} />
            </div> 
            <div className="fav-service-card-body" onClick={() => history.push(`/services/category/${categoryId}/${service.id}`)}>
                <div className="service-card-profile">
                    <img src={ProfilePic} alt={'profile-pic'} />
                    <p>{displayName}</p>
                </div>    
                <div className="fav-service-card-description">pboo
                    <p>{ serviceInfo }</p>
                </div>  
                <div className='fav-service-card-rating'>
                    <BsFillStarFill className='fav-service-rating-logo' />
                    <p>{ totalRating && totalRating.avgRating }<span>({ totalRating && totalRating.totalNoUser})</span></p>
                </div>
            </div>  
            <div className='fav-service-card-footer'>
                <div style={{display: 'flex', flexDirection :'column'}}>
                    <div className='booked-at'>Booked on:&nbsp;{getBookingDate()}</div>
                    <div className='booked-at'>{new Date() > deliveryOn ? 'Delivered on:' : 'Delivery on:'}&nbsp;{getDeliveryDate()}</div>
                </div>
            </div>  
            <ButtonN onClick={hanldeFeedback} className={new Date() < deliveryOn ? 'feed-btn hide' : 'feed-btn'}>Give a Feedback</ButtonN>
        </div>
    )
}

export default BookingDetailCard