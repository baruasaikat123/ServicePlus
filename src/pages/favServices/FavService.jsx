import './favservice.css'
import ServiceCard from '../../components/card/ServiceCard'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../utils/init-firebase'
import { useEffect, useState } from 'react'
import { auth } from '../../utils/init-firebase'
import Sidebar from '../../components/sidebar/Sidebar'
import Loading from '../../components/Loading'

const FavService = () => {

  const [favs, setFavs] = useState([])
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [noRequest, setNoRequest] = useState(false)

  const docRef = doc(db, 'service_require', 'misODt2jBBNHdWhvFKrRYKXbSI62')
  const map = new Map()

  useEffect( async() => {
    try {
      const docSnap = await getDoc(docRef)
      setIsLoading(false)
      if (docSnap.exists()) {
        const getData = docSnap.data().fav
        setFavs(getData)
        
      }
    }
    catch (err) {
      console.log(err)
    }
  }, [])

  /*if (favs.length===0) {
    setNoRequest(true)
  }

  else {
    setNoRequest(false)
  }*/

  const fetchUsers = async () => {

    try {

      const ref = collection(db, 'user')
      const q = query(ref, where('__name__' , 'in', favs))
  
      const docSnap = await getDocs(q)

      if (docSnap) {
        const getUsers = docSnap.docs.map(doc => ({
          data: doc.data(),
          id: doc.id
        }))
        setUsers(getUsers)
      }
      
    }
    catch (err) {
      console.log(err.message)

    }

  }

  console.log('fav', favs);
  console.log('u', users);

  useEffect(() => {

    fetchUsers()
    if (favs.length===0) {
      setNoRequest(true)
    }

    else {
      setNoRequest(false)
    }
    
  }, [favs.length])
  

  console.log('no',noRequest);
 

  return (

    <div style={{display: 'flex'}}>
      <div>
        <Sidebar />
      </div>
      {
        isLoading ? <div className='fav-services-loading'><Loading /></div> : noRequest ?
        <div className='fav-services-no-request'><h4>Nothing added yet.🙁</h4></div>
          :
        <div className="fav-services-container">
          {users.map((user, key) => {
            map.set(user.id, true)
            return <ServiceCard key={key} index={key} favs={users} mp={map} id={user.id} user={user} />
          })}
        </div>
      }
    </div>
  )
}

export default FavService