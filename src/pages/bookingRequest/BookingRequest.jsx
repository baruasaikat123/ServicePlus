import './bookingrequest.css'
import { BookingRequestCard } from '../../components/card/BookingRequestCard'
import Sidebar from '../../components/sidebar/Sidebar'
import { useState } from 'react'
import { collection, doc, where, query, getDocs, getDoc } from 'firebase/firestore'
import { db } from '../../utils/init-firebase'
import { useEffect } from 'react'
import Loading from "../../components/Loading"
import RequestModal from '../../components/serviceRequest/RequestModal'
import { useAuth } from '../../contexts/authContext'

const BookingRequest = () => {

    const { currentRequestId } = useAuth()
    
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(true)
    const [noData, setNodata] = useState(false)
    const [users, setUsers] = useState([])
    const [acceptClick, setAcceptClick] = useState(false)
    const [rejectClick, setRejectClick] = useState(false)
    const [documentId, setDocumentId] = useState('')
    
    const id = '7SfuFjUAhfuPJxMtRxqc'
    const fetchRequests = async () => {
        const docRef = collection(db, 'service_request')
        const q = query(docRef, where('id', '==', id))
      
        try {
            const docSnap = await getDocs(q)
            console.log(docSnap.docs.length);
            setLoading(false)
            if (docSnap.docs.length > 0) {
                
                if (docSnap.docs[0].data().requestId.length > 0) {
                    const getRequests = docSnap.docs.map(doc => ({
                        data: doc.data().requestId,
                        id: doc.id
                    }))
                    setRequests(getRequests[0].data)
                    setDocumentId(getRequests[0].id)
                }
                else {
                    setNodata(true)
                }
               
            }
            else {
                setNodata(true)
            }
            
        }
        catch (err) {
            console.log(err.message);
        }
    }

    const fetchUsers = async () => {

        if (requests.length === 0) {
            setUsers([])
            return
        }

        const ref = collection(db, 'user')
        const qr = query(ref, where('__name__', 'in', requests))
        
        try {
            const snap = await getDocs(qr)
            if (snap.docs) {
                const getUsers = snap.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }))

                setUsers(getUsers)
                setLoading(false)
            }
        }
        catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchRequests()
    }, [])

    useEffect(() => {
        fetchUsers()
    }, [requests.length])


    return (
        <div style={{display: 'flex'}}>
            <Sidebar />
            {noData ?
                (<div className='no-requests-container'>
                    <h4>You have 0 Requests🙁.</h4>
                </div>) :
                <>
                    {loading ?
                        (<div className='booking-request-loader'>
                            <Loading />
                        </div>) :
                        <>
                            { (acceptClick || rejectClick) && <RequestModal
                                acceptClick={acceptClick}
                                setAcceptClick={setAcceptClick}
                                setRejectClick={setRejectClick}
                                id={documentId}
                                rid={currentRequestId}
                                requests = {requests}
                            />}
                            <div className='booking-request-container'>
                                {users && users.map((user, key) => (
                                    <BookingRequestCard key={key} user={user} acceptClick={ acceptClick} setAcceptClick={setAcceptClick} setRejectClick={setRejectClick} />
                                ))}
                            </div>
                            <div className='booking-request-instructions-container'>
                                <h3>Instructions</h3>
                                <p><span style={{ fontWeight: 'bold' }}>Accept</span>&nbsp;only if you are available.</p>
                            </div></>
                    }
                </>
            }
        </div>
    )
}

export default BookingRequest