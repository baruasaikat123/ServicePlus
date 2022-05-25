import './myServiceCard.css'
import { BsFillSkipStartFill, BsFillStarFill } from 'react-icons/bs'
import { GoPrimitiveDot } from 'react-icons/go'
import { ButtonN } from '../../style'
import { useAuth } from '../../contexts/AuthContext'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { db } from '../../utils/init-firebase'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { AiFillDelete } from 'react-icons/ai'
import ProfilePic from '../../images/my.jpg'

const MyServiceCard = ({ service, setDeleteClick }) => {

    //const { status, requests } = service.data
    const { category, gender, displayName, experience, fees, location, serviceDetail, serviceInfo, status, requests, totalRating} = service.data
    
    
    const { handleServiceId } = useAuth()
    //const params = useParams()
    const history = useHistory()

    //const [requestCount, setRequestCount] = useState(0)

    const handleDelete = () => {
        handleServiceId(service.id)
        setDeleteClick(true)
    }

    // useEffect(() => {
    //     const ref = doc(db, 'services', service.id)
    //     const unsubscribe = onSnapshot(ref, snapshot => {
    //       if(snapshot.data().requestId) setRequestCount(snapshot.data().requestId.length)
    //     })
    //     return () => unsubscribe()
    
    // }, [])
    
    const handleStatus = () => {
        const ref = doc(db, 'services', service.id)
        if (status === 'A') {
            updateDoc(ref, {
                status: 'N'
            }).then(() => console.log('deactivate successfully'))
                .catch(err => console.log(err.code))
        }

        else {
            updateDoc(ref, {
                status: 'A'
            }).then(() => console.log('activated'))
            .catch(err => console.log(err.code))
        }
    }
    
    return (
        <div className="my-service-card-container">
            <div className="my-service-card-body" onClick={() => history.push(`/my-service/${service.id}`)}>
                <div className="service-card-profile">
                    <img src={ProfilePic} alt={'profile-pic'} />
                    <p>{displayName}</p>
                    {<GoPrimitiveDot style={{color: status === 'A' ? 'green' : 'red'}}/>}
                </div>    
                <div className="my-service-card-description">
                    <p>{serviceInfo}</p>
                </div>  
                <div className='my-service-card-info'>
                    <div className='my-service-card-rating'>
                        <BsFillStarFill className='my-service-rating-logo' />
                        <p>{totalRating.avgRating}<span>({totalRating.totalNoUser})</span></p>
                    </div>
                    <p style={{color: 'var(--app-blue)'}}>Pending Requests&nbsp;<span>({requests.length})</span></p>
                </div>
            </div>  
            <div className="my-service-card-footer">
                {/* <div onClick={handleDelete} className='my-service-dlt-btn'><AiFillDelete size={'20px'} /></div> */}
                <ButtonN onClick={ handleStatus } className='my-service-status-btn'>{status === 'A' ? 'Deactivate' : 'Activate'}</ButtonN>
                
            </div>  
        </div>
    )
}

export default MyServiceCard