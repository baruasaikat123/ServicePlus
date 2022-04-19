import ServiceCard from "../../components/card/ServiceCard"
import { useState, useEffect } from "react"
import { getDocs, collection, query, where, doc, getDoc } from "firebase/firestore"
import { db } from '../../utils/init-firebase.js'
import './service.css'
import { Routediv, RouteLinks, RouteLinkContainer, RouteHeading, AppLoader } from "../../style"
import { useParams } from "react-router-dom"
import { categoryMap } from "./categoryItems"
import Loading from "../../components/Loading"


const Service = () => {

  const [users, setUsers] = useState([])
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  //const favouriteMap = []

  useEffect(() => {
    const userCollectionRef = collection(db, 'user')
    getDocs(userCollectionRef)
        .then(response => {
          //console.log(response.docs)
          setLoading(false)
          const getUsers = response.docs.map(doc => ({
            data: doc.data(),
            id: doc.id,
          }))
          setUsers(getUsers)
        }).catch((error) => {
          setLoading(false)
          console.log(error)
        })
  }, [])


  const [favs, setFavs] = useState([])
  const [check, setCheck] = useState(true)
  //const [check, setCheck] = useState(false)


  const docRef = doc(db, 'service_require', 'misODt2jBBNHdWhvFKrRYKXbSI62')
  const favouriteMap = new Map()

  useEffect( async() => {
    try {
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const getData = docSnap.data().fav
        setFavs(getData)
      }
    }
    catch (err) {
      console.log(err)
    }
  }, [])
  //favouriteMap.set('123',true)

    for (let i = 0; i < favs.length; i++) {
      favouriteMap.set(`${favs[i]}`, true)
      //console.log(`${favs[i]}`);
    }
  

  console.log('mp',favouriteMap);


  
  //console.log(users);
    

  // useEffect(() => {

  //   const q = query(collection(db, 'user'), where('category', '==', category))
  //   getDocs(q).then((response) => {
  //     const getUsers = response.docs.map(doc => ({
  //       data: doc.data(),
  //       id: doc.id
  //     }))
  //     setUsers(getUsers)
  //   }).catch(error => console.log(error))
    
  //     // getDocs(userCollectionRef)
  //     //   .then(response => {
  //     //     //console.log(response.docs)
  //     //     const getUsers = response.docs.map(doc => ({
  //     //       data: doc.data(),
  //     //       id: doc.id
  //     //     }))
  //     //     setUsers(getUsers)
  //     //   }).catch(error => console.log(error.message))
  //   }, [category])

  const params = useParams()
  const categoryId = params.categoryId

  if (loading) return <Loading />
    
  return (
    <>
      <Routediv>
        <RouteHeading>
          <h2>{categoryMap[categoryId]}&nbsp;Services</h2>
        </RouteHeading>
        <RouteLinkContainer>
          <RouteLinks to='/'><p>Home</p></RouteLinks>
          <p>&nbsp;/&nbsp;</p>
          <RouteLinks to="/services/category">Category</RouteLinks>
          <p>&nbsp;/&nbsp;</p>
          <p>{categoryMap[categoryId]}</p>
        </RouteLinkContainer>
      </Routediv>
      <div className="box-container">
        {users.map((user, key) => {
          if (!favouriteMap.has(user.id)) {
            favouriteMap.set(user.id, false)
          }
          return <ServiceCard index={key} favs={users} mp={favouriteMap} id={user.id} user={user} />
        })}
      </div>
    </>
  )
}

export default Service