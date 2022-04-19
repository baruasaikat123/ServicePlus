import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import ServiceHistoryCard from '../../components/serviceHistoryCard/ServiceHistoryCard'
import Sidebar from '../../components/sidebar/Sidebar'
import './servicehistory.css'
import { db } from '../../utils/init-firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

const ServiceHistory = () => {

    const [loading, setLoading] = useState(true)
    const [noData, setNoData] = useState(false)
    const [serviceIds, setServiceIds] = useState([])
    const [users, setUsers] = useState([])

    const fetchServiceHistory = async() => {
        const id = '7SfuFjUAhfuPJxMtRxqc'
        const ref = collection(db, 'service_history')
        const q = query(ref, where('id', '==', id))

        try {
            const snap = await getDocs(q)
            setLoading(false)
            if (snap.docs.length > 0) {
                const getIds = snap.docs.map(doc => ({
                    data: doc.data().serviceId,
                    id: doc.id
                }))
                setServiceIds(getIds[0].data)
            }
        }
        catch (err) {
            console.log(err.message);
        }

    }

    const fetchUsers = async () => {

        const ref = collection(db, 'user')
        const qr = query(ref, where('__name__', 'in', serviceIds))
        
        try {
            const snap = await getDocs(qr)
            if (snap.docs) {
                const getUsers = snap.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }))

                setUsers(getUsers)
            }
        }
        catch (err) {

            console.log(err.message);
        }
    }

    useEffect(() => {
       fetchServiceHistory()
    }, [])

    useEffect(() => {
        fetchUsers()
    },[serviceIds.length])
    
    console.log('id', serviceIds);
    console.log('u', users);

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            {loading ? <div className='service-history-loader'><Loading /></div> :
                noData ? <div className='service-history-no-data'><h4>Nothing to show here.🙁</h4></div> :
                    <div className='service-history-container'>
                        {users && users.map((user, key) => (
                            <ServiceHistoryCard key={key} user={user}/>
                        ))}
                    </div>
            }
        </div>
    )
}

export default ServiceHistory