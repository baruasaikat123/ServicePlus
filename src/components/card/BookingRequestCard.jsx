import './bookingRequestCard.css'
import { ButtonN } from '../../style'
import { FaTimes } from 'react-icons/fa'
import { MdDone } from 'react-icons/md'
import { useAuth } from '../../contexts/authContext'
import { useEffect } from 'react'

export const BookingRequestCard = ({ user, acceptClick, setAcceptClick, setRejectClick }) => {
    
    const { handleRequestId } = useAuth()
    

    const handleAccept = () => {
        setAcceptClick(true)
        handleRequestId(user.id)
    }
    return (
        <div className='booking-request-card-container'>
            <div className='booking-request-card-content'>
                <h4>Name: {user.data.name}</h4>
                <h4>Address: {user.data.address.state},{ user.data.address.city}</h4>
            </div>
            <div className='booking-request-card-btn-container'>
                <ButtonN onClick={handleAccept} className='booking-request-card-btn-accept'>
                    Accept<MdDone style={{marginLeft: '10px'}}/>
                </ButtonN>
                <ButtonN onClick={() => setRejectClick(true) } className='booking-request-card-btn-reject'>
                    Reject<FaTimes style={{marginLeft: '10px'}}/>
                </ButtonN>
            </div>
        </div>
        
    )
}
