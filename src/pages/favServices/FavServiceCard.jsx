import { ButtonN } from '../../style'
import './favServiceCard.css'
import { useHistory, useParams } from 'react-router-dom'
import { BsFillStarFill } from 'react-icons/bs'
import { updateDoc, arrayRemove, doc } from 'firebase/firestore'
import { db } from '../../utils/init-firebase'
import { useAuth } from '../../contexts/AuthContext'
import ServicePic from '../../images/default.png'
import ProfilePic from '../../images/my.jpg'

const FavServiceCard = ({ service }) => {

    const { currentUser } = useAuth()
    const history = useHistory()
    const params = useParams()
    const categoryId = params.categoryId

    const { category, gender, displayName, experience, fees, location, serviceDetail, serviceInfo} = service.data
    
    const remove = () => {
        const ref = doc(db, 'users', currentUser.uid)
        updateDoc(ref, {
            fav:arrayRemove(service.id)
          }).then(() => {
            console.log('remove')
          })
          .catch(err => console.log(err.code))
    }

    return (
        <div className="fav-service-card-container">
            <div className="card-pic">
                <img src={ ServicePic } alt={'service-pic'} />
            </div> 
            <div className="fav-service-card-body" onClick={() => history.push(`/services/category/${categoryId}/${service.id}`)}>
                <div className="service-card-profile">
                    <img src={ ProfilePic } alt={'profile-pic'} />
                    <p>{displayName}
                    {/* <GoPrimitiveDot className={status === 'Available' ? 'icon-available' : 'icon-notavailable'} /> */}
                    </p>
                    {/* <p style={{color: '#ccc'}}>{ status }</p> */}
                </div>    
                <div className="fav-service-card-description">
                    <p>{ serviceInfo }</p>
                </div>  
                <div className='fav-service-card-rating'>
                    <BsFillStarFill className='fav-service-rating-logo' />
                    {/* <p>{ rating }<span>({ totalRating})</span></p> */}
                </div>
            </div>  
            <div className="fav-service-card-footer">
                <ButtonN style={{background: 'var(--app-red)', color: 'white'}} onClick={remove}>Remove</ButtonN>
                <p style={{marginTop: '35px', color: '#ccc', fontWeight: 'bold'}}>STARTING AT<pre style={{fontSize: '18px'}}>&nbsp;&nbsp;&#x20B9;&nbsp;{ fees }</pre></p>
            </div>  
        </div>
      
    )
}

export default FavServiceCard