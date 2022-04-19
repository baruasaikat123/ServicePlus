import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import AppRouter from './components/AppRouter'
import { setCurrentUser } from './redux/actions/authAction'
import { auth, db } from './utils/init-firebase'
import { addDoc, getDocs,} from 'firebase/firestore'
import AuthContextProvider from './contexts/authContext'


function App() {

  const modalValue = useSelector((state) => state.modalValue)

  if (modalValue.openModal) document.body.style.overflowY = 'hidden'
  else document.body.style.overflowY = 'auto'
  //const userCollectionRef = collection(db, 'service_provider')

  
  /*useEffect(() => {
    addDoc(userCollectionRef, {
      userId: 'misODt2jBBNHdWhvFKrRYKXbSI62',
      name: 'Saikat Barua',
      gender: 'Male',
      category: 'SERVICE_PROVIDER',
      status: 'Available',
      rating: '4.9',
      totalRating: '320',
      price: '1200',
      serviceAbout: 'hello, my name is saikat',
      address: {
        state: 'West Bengal',
        city: 'Cooch Behar'
      }
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error.message);
    })
  }, [])*/
  
  document.body.style.overflowX = 'hidden'

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      dispatch(setCurrentUser(user))
    })

    return () => unsubscribe()
  }, [])

  const currentUser = useSelector((state) => state.currentUser)

  console.log(currentUser)

  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
}

export default App;
