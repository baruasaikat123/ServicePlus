import './feedback.css'
import Loading from '../Loading'
import { useState } from 'react'
import { ButtonN } from '../../style'
import {AiFillStar} from 'react-icons/ai'
import { useAuth } from '../../contexts/AuthContext'
import { addDoc, collection, doc, updateDoc, } from 'firebase/firestore'
import { db } from '../../utils/init-firebase'
import { ToastContainer, toast } from 'react-toastify'

const Feedback = ({ setShowFeedback }) => {
    
    const { currentServiceId, currentUser, ratingDetail } = useAuth()
    

    const [loading, setLoading] = useState(false)
    const [feedbackText, setFeedbackText] = useState('')
    const [rating, setRating] = useState(0)

    const handleSubmit = () => {
        if (!rating) {
            toast.error('please give some rating!',{
                autoClose: 2000
            })
            return
        }

        const ref = collection(db, 'feedback')
        setLoading(true)
        addDoc(ref, {
            customerId: currentUser.uid,
            msg: feedbackText,
            rating: rating,
            serviceId: currentServiceId

        }).then(() => {
            updateFeed()
            console.log('added')
        })
        .catch(err => console.log(err.code))
        .finally(() => {
            setLoading(false)
            setShowFeedback(false)
        })
        
    }

    const updateFeed = () => {
        const docRef = doc(db, 'services', currentServiceId)
        updateDoc(docRef, {
            totalRating: {
                totalNoUser: ratingDetail.totalNoUser ? ratingDetail.totalNoUser + 1 : 1,
                avgRating: ratingDetail.avgRating ? (((ratingDetail.avgRating * ratingDetail.totalNoUser) + rating) / (ratingDetail.totalNoUser + 1)).toFixed(1) : rating
            }
        }).then(() => console.log('updated'))
        .catch(err => console.log(err.code))

    }



    return (
        <> <ToastContainer position={toast.POSITION.TOP_CENTER}  />
        <div className='request-modal-component'>
            {loading ? <Loading /> :
                <div className='feedback-modal-container'>
                    <div className="feedback-modal-description">
                        <div style={{display: 'flex', paddingBottom: '30px'}}>
                            <label style={{fontSize: '17px'}}>Give stars:&nbsp;&nbsp;</label>
                            <div style={{display: 'flex', justifyContent: 'space-evenly', width: '80%',}}>
                                <AiFillStar size={'20px'} className={rating >= 1 ? 'feed-star rating' : 'feed-star'} onClick={() => setRating(1)}/>
                                <AiFillStar size={'20px'} className={rating >= 2 ? 'feed-star rating' : 'feed-star'} onClick={() => setRating(2)}/>
                                <AiFillStar size={'20px'} className={rating >= 3 ? 'feed-star rating' : 'feed-star'} onClick={() => setRating(3)}/>
                                <AiFillStar size={'20px'} className={rating >= 4 ? 'feed-star rating' : 'feed-star'} onClick={() => setRating(4)}/>
                                <AiFillStar size={'20px'} className={rating >= 5 ? 'feed-star rating' : 'feed-star'} onClick={() => setRating(5)}/>
                            </div>
                        </div>
                        <div>
                            <label>Write your feedback here:</label>
                            <textarea
                             value={feedbackText}
                             rows={4}
                             style={{ marginTop: '10px', width: '100%', padding: '10px', resize: 'none', borderRadius: '8px', fontSize: '17px' }} 
                             onChange={(e) => setFeedbackText(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="request-modal-btn">
                        <ButtonN onClick={handleSubmit} className='request-modal-btn-ok'>Submit</ButtonN>
                        <ButtonN onClick={() => setShowFeedback(false) } className='request-modal-btn-cancel'>Cancel</ButtonN>
                    </div>
                </div>
            }
        
        </div></>
      
    )
}

export default Feedback