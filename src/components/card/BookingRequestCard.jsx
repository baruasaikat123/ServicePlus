import './bookingRequestCard.css'
import { ButtonN } from '../../style'
import { FaTimes } from 'react-icons/fa'
import { MdDone } from 'react-icons/md'
import { useAuth } from '../../contexts/AuthContext'
import { monthMap } from '../../constants'
export const BookingRequestCard = ({ request, setAcceptClick, setRejectClick }) => {
    
    const { handleRequestId, handleDeliveryDate, handleDeliveryLocation } = useAuth()

    //const { bookingDay, requestId } = request
    
    const handleAccept = () => {
        setAcceptClick(true)
        handleRequestId(request.requestId)
        handleDeliveryDate(request.bookingDay)
        handleDeliveryLocation(request.location)
    }

    const handleReject = () => {
        setRejectClick(true)
        handleRequestId(request.requestId)
        handleDeliveryDate(request.bookingDay)
        handleDeliveryLocation(request.location)
    }

    const getDeliveryDate = () => {
        const d = monthMap[request.bookingDay.toDate().getMonth()] + " " + request.bookingDay.toDate().getDate() + ", " + request.bookingDay.toDate().getFullYear()

        return d
    }


    return (
        <div className='booking-request-card-container'>
            <div className='booking-request-card-content'>
                {/* <h4>Name:{ }</h4>  */}
                <p>Location: {request.location}</p>
                <p>Delivery on: {getDeliveryDate()} </p>
            </div>
            <div className='booking-request-card-btn-container'>
                <ButtonN onClick={handleAccept} className='booking-request-card-btn-accept'>
                    Accept
                </ButtonN> 
                <ButtonN onClick={ handleReject } className='booking-request-card-btn-reject'>
                    Reject
                </ButtonN>
            </div>
        </div>
        
    )
}
