import './serviceCard.css'
import { BsFillStarFill } from 'react-icons/bs'
import { AiFillHeart } from 'react-icons/ai'
import { GoPrimitiveDot } from 'react-icons/go'
import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { db } from '../../utils/init-firebase'
import { doc, updateDoc, arrayRemove, arrayUnion, getDoc } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import Loading from '../Loading'

const ServiceCard = ({ index, favs, mp , id, user }) => {

  const [favClick, setFavClick] = useState(false)
  //let favClick = false
  //if(mp.get(id)) favClick = true
  const { name, rating, price, serviceAbout, status, totalRating, gender } = user.data
  const history = useHistory()
  const params = useParams()
  const categoryId = params.categoryId

  //const userCollectionRef = collection(db, 'service_require').doc('misODt2jBBNHdWhvFKrRYKXbSI62')
  
  useEffect(() => {
    if(mp.get(id)) setFavClick(true)
  },[mp.get(id)===true])

  //console.log(mp.get(id), id, favClick);
  const addToFav = () => {
    const userCollectionRef = doc(db, 'service_require','misODt2jBBNHdWhvFKrRYKXbSI62')
    
    if (!mp.get(id)) {
      updateDoc(userCollectionRef, {
        fav: arrayUnion(id)
      }
      ).then((res) => {
        setFavClick(!favClick)
        //favClick = true
        //console.log('id',mp.get(id))
        //mp.set(id, true)
        //console.log('change',mp.get(id));
      }).catch(err => console.log(err.message))
    }

    else {
      updateDoc(userCollectionRef, {
        fav: arrayRemove(id)
      }
      ).then((res) => {
        setFavClick(!favClick)
        favs.splice(index, 1)
        console.log('change',favs);
        //favClick = false
        //mp.set(id, false)
      }).catch(err => console.log(err.message))
    }
  }


  //const [check, setCheck] = useState(false)

  // useEffect(() => {
  //   for (let i = 0; i < favs.length; i++){
      
  //     if (favs[i] === id) {
  //       setCheck(true)
  //       break
  //     }
  //   }
  // }, [])
  
  //console.log('mp', mp.get(id));


  return (
    <div className="card-container">
      <div className="card-pic">
        <img alt={'service-pic'} />
      </div> 
      <div className="card-body" onClick={() => history.push(`/services/category/${categoryId}/${id}`)}>
        <div className="card-profile">
          <img alt={'profile-pic'} />
          <p>{name}
            <GoPrimitiveDot className={status === 'Available' ? 'icon-available' : 'icon-notavailable'} />
          </p>
          <p style={{color: '#ccc'}}>{ status }</p>
        </div>    
        <div className="card-description">
          <p>{ serviceAbout }</p>
        </div>  
        <div className='card-rating'>
          <BsFillStarFill className='rating-logo' />
          <p>{ rating }<span>({ totalRating})</span></p>
        </div>
      </div>  
      <div className="card-footer">
        <AiFillHeart
          onClick={ addToFav }
          className={ favClick ? 'fav-logo-active' : 'fav-logo'} />
        <h4>STARTING AT<pre>&nbsp;&nbsp;&nbsp;&nbsp;&#x20B9;&nbsp;{ price }</pre></h4>
      </div>  
    </div>
  )
}

export default ServiceCard