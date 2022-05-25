import React, { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import ServiceHistoryCard from './ServiceHistoryCard'
import Sidebar from '../../components/sidebar/Sidebar'
import './servicehistory.css'
import { db } from '../../utils/init-firebase'
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore'
import Profilebar from '../../components/profilebar/Profilebar'
import Pagination from '../../components/pagination/Pagination'
import { useAuth } from '../../contexts/AuthContext'

const ServiceHistory = () => {

    const { currentUser } = useAuth()
    
    const [bookingDetails, setBookingDetails] = useState([])
    const [noData, setNoData] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    const [loading, setLoading] = useState(true)

    const servicesPerPage = 9
    const pagesVisited = pageNumber * servicesPerPage
  
    const displayBookings = bookingDetails
    .slice(pagesVisited, pagesVisited + servicesPerPage)
    .map((bd,key) => {
        return <ServiceHistoryCard key={bd.id} bookings={bd} />
    })
  
    const pageCount = Math.ceil(bookingDetails.length / servicesPerPage)
    
    const changePage = ({ selected }) => {
      setPageNumber(selected)
    }

    useEffect(() => {

        if(!currentUser) return

        const ref = collection(db, 'booking_history')
        const q = query(ref, where('serviceOwner', '==', currentUser.uid))

        const unsubscribe = onSnapshot(q, snapshot => { 

            if (snapshot.docs.length === 0) {
                setNoData(true)
            }
            else {
                const getData = snapshot.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }))
                
                setBookingDetails(getData)
            }

            setLoading(false)
        })
        
        return () => unsubscribe()

    }, [currentUser])

    return (
        <>
            <Profilebar />
            <Sidebar />
            {loading ? <Loading /> : noData ? <h4>Nothing to show!☹️</h4> :
                <>
                    <div className="my-service-box-container">
                        {displayBookings}
                    </div>
                    <div className="fav-services-pagination-container">
                        <Pagination changePage={changePage} pageCount={pageCount} />
                    </div>
                </>
            }
        </>
    )
}

export default ServiceHistory
  