import { Link } from "react-router-dom"
//import { useHistory } from 'react-router-dom'
import { monthMap } from "../../constants"

const ServiceHistoryCard = ({ bookings }) => {
    
    const { bookedOn, deliveryOn, location, phoneNumber, bookedFor, confirm } = bookings.data

    const getDeliveryDate = () => {
        const d = deliveryOn.toDate()
        return monthMap[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()
    }

    const getBookedDate = () => {
        const d = bookedOn.toDate()
        return monthMap[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear()
    }
    

    return (
        <div className="service-history-card-container">
            <div className="service-history-card-description">
                <div style={{borderBottom: '1px solid #ccc' }}>
                    <h5 style={{borderBottom: '1px solid #ccc', padding: '15px 18px', color: 'rgb(142, 139, 139)'}}>Delivery Details</h5>
                    <div style={{padding: '15px'}}>
                        <p>Location: <span>{location}</span></p>
                        <p>PhoneNo: <span>{phoneNumber}</span></p>
                        <p>Delivery date: <span>{getDeliveryDate()}</span></p>
                        <p>Booked on: <span>{getBookedDate()}</span></p>
                    </div>
                </div>
                <div className="service-history-footer">
                    <p>Status: <span style={{ color: confirm ? 'green' : 'red' }}>{confirm === true ? 'Confirmed' : 'Pending...'}</span> </p>
                    <p>Service Reference: <Link style={{paddingLeft: '15px', fontWeight: 'normal', color: 'gold'}} to={`/my-service/${bookedFor}`}>View</Link></p>
                </div>
            </div>  
        </div>
    )
}

export default ServiceHistoryCard