import { onSnapshot, query, where, collection } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../../utils/init-firebase"
import {AiFillStar} from 'react-icons/ai'

const FeedbackComponent = ({ serviceId }) => {
    
    const [feed, setFeed] = useState([])
    const [noFeed, setNoFeed] = useState(false)

    const displayRating = (rating) => {

        let clr = '#ccc'
    
        if (rating == 4 || rating == 5) clr = 'green'
        
        else if (rating == 3) clr = 'gold'
        
        else clr = 'red'
       
        let arr = []
        
        for (let i = 0; i < rating; i++){
          arr.push(i)
        }
    
        return (
          arr.map((r,key) => (
              <AiFillStar key={key} style={{color: clr}}/>
          ))
        )
        
    }

    useEffect(() => {

        const ref = collection(db, 'feedback')
        const q = query(ref, where('serviceId', '==', serviceId))

        const unsubscribe = onSnapshot(q, snapshot => {

            if (snapshot.docs.length === 0) {
                setNoFeed(true)
            }
            else {
                setNoFeed(false)
                const getData = snapshot.docs.map(doc => ({
                    data: doc.data(),
                    id: doc.id
                }))
                setFeed(getData)
            }

           
        })

        return () => unsubscribe()

    }, [])
    
    return (
        <>
            {noFeed ? <h2 style={{color: '#ccc'}}>No Feedback yet!</h2> :
                feed.map((f, key) => (
                    <div key={f.id} style={{ borderBottom: '1px dashed #ccc' }}>
                        <div style={{ display: 'flex', paddingBottom: '10px' }}>
                            {f.data.rating > 0 && displayRating(f.data.rating)}
                        </div>
                        <p style={{fontSize: '20px'}}>{f.data.msg}</p>
                    </div>
                ))
            }
        </>
    )
}

export default FeedbackComponent