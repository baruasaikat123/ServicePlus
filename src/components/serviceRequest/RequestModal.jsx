import './requestmodal.css'
import { ButtonN } from '../../style'
import { doc, updateDoc, arrayRemove, collection, addDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../utils/init-firebase'
import { useEffect, useState } from 'react'
import Loading from '../Loading'
import { useAuth } from '../../contexts/AuthContext'

const RequestModal = ({
    acceptClick,
    setAcceptClick,
    setRejectClick,
    serviceId,
    rid,
    deliveryDate}) => {

    const [loading, setLoading] = useState(false)
    const [click, setClick] = useState(false)
    const [reasonText, setReasonText] = useState('')

    const { rejectNo, deliveryLocation, currentUser  } = useAuth()

    console.log(rejectNo ? rejectNo : 1)
   
    const handleRequests = () => {

        if (!acceptClick && !reasonText) {
            alert('specify reason first')
            return
        }
        
        const ref = doc(db, 'services', serviceId)


        setLoading(true)

        updateDoc(ref, {
          
            requests: arrayRemove({
                requestId: rid,
                location: deliveryLocation,
                bookingDay: deliveryDate
            })
        })
        .then(() => {
            if (acceptClick) {
                updateBooking()
                setAcceptClick(false)
            }
            else {
                updateDoc(ref,{
                    rejectNo: rejectNo ? rejectNo +1 : 1
                })
                setRejectClick(false)
            }
        })
         .catch(err => console.log(err.message))  
        .finally(() => setLoading(false))
    }


    const updateBooking = () => {

        const ref = collection(db, 'booking_history')

        addDoc(ref, {
            bookedBy: rid,
            bookedFor: serviceId,
            bookedOn: new Date(),
            deliveryOn: deliveryDate,
            location: deliveryLocation,
            phoneNumber: '8597460589',
            confirm: true,
            serviceOwner: currentUser.uid
        }).then(() => console.log('added'))
            .catch(err => console.log(err.code))
        
        const docRef = doc(db, 'users', rid)
        
        updateDoc(docRef, {
            bookingId: arrayUnion(serviceId)
        }).then(() => console.log('updated'))
        .catch(err => console.log(err.code))
    }

    useEffect(() => {
        if (click) handleRequests()
        
        return () => setClick(false)
    }, [click])
    
    useEffect(() => {
        if (new Date() === deliveryDate) {
            const ref = collection(db, 'booking_history')
            updateDoc(ref, {
                requests: arrayRemove({
                    requestId: rid,
                    location: deliveryLocation,
                    bookingDay: deliveryDate
                })
            })
            .then(() => {
          
                updateDoc(ref,{
                    rejectNo: rejectNo ? rejectNo +1 : 1
                })
                setRejectClick(false)
                
            })
            .catch(err => console.log(err.message))  
            .finally(() => setLoading(false))
        }

    },[])

    
    return (
        <div className='request-modal-component'>
           {loading ? <Loading /> :  <div className={acceptClick ? 'request-modal-container' : 'request-modal-container reject'}>
                <div className="request-modal-description">
                    {acceptClick ? <p style={{fontSize: '18px', fontWeight: 'bold'}}>Before proceeding make sure you are avaiable at this specific date and time.</p>
                        :
                        <>
                            <p style={{fontWeight: 'bold', fontSize: '18px'}}>Specify the reason:</p>
                            <textarea 
                                value={reasonText}
                                rows={4}
                                style={{ marginTop: '10px', width: '100%', padding: '10px', resize: 'none', borderRadius: '8px', fontSize: '17px' }} 
                                onChange={(e) => setReasonText(e.target.value)}
                            />
                        </>
                    }
                </div>
                <div className="request-modal-btn">
                    <ButtonN
                        onClick={ () => setClick(true) }
                        className='request-modal-btn-ok'>{acceptClick ? 'Yes, I am sure' : 'Yes, I want to Reject'}</ButtonN>
                    <ButtonN onClick={ acceptClick ? () => setAcceptClick(false) : () => setRejectClick(false)}
                        className='request-modal-btn-cancel'>Cancel</ButtonN>
                </div>
            </div>}
        </div>
        
    )
}

export default RequestModal