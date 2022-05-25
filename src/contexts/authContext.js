import { createContext, useContext, useEffect, useState } from "react"
import { auth } from '../utils/init-firebase'
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    GoogleAuthProvider
} from "firebase/auth"

const AuthContext = createContext({
    currentUser: null,
    authModalClick: false,
    register: () => Promise,
    logout: () => Promise,
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
        })
        return () =>  unsubscribe()
    }, [])
    
    const [authModalClick, setAuthModalClick] = useState(false)
    const [currentRequestId, setCurrentRequestId] = useState(null)
    //const [bookingDate, setBookingDate] = useState(null)
    const [deliveryDate, setDeliveryDate] = useState(null)
    const [deliveryLocation, setDeliveryLocation] = useState('')
    const [currentServiceId, setCurrentServiceId] = useState(null)
    const [rejectNo, setRejectNo] = useState(0)
    //const [serviceInfo, setServiceInfo] = useState([])
    const [serviceData, setServiceData] = useState({
        category: null,
        name: '',
        gender: null,
        address: '',
        state: null,
        city: null,
        serviceAbout: '',
        detailInfo: '',
        experience: '',
        fees: '',
        days: [],
        pincode: null,
        userId: null
    })

    const [stateNames, setStateNames] = useState([])
    const [currState, setCurrState] = useState(null)
    const [stateMap, setStateMap] = useState(new Map())
    const [favMap, setFavMap] = useState(new Map())
    const [ratingDetail, setRatingDetail] = useState({})

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setServiceData({...serviceData, [name]:value})
    }
    
    function handleServiceId(value) {
        setCurrentServiceId(value)
    }

    function handleRating(value) {
        setRatingDetail(value)
    }

    function handleDeliveryLocation(value) {
        setDeliveryLocation(value)
    }


    function handleDeliveryDate(value) {
        setDeliveryDate(value)
    }

    function handleAuthModal(value) {
        setAuthModalClick(value)
    }
    function handleRequestId(value) {
        setCurrentRequestId(value)
    }
    function handleRejectNo(value) {
        setRejectNo(value)
    }
    function register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    function registerWithGoogle() {
        return GoogleAuthProvider(auth)
    }
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }
    function logout() {
        return signOut(auth)
    }

    const value = {
        currentUser,
        authModalClick,
        handleAuthModal,
        register,
        login,
        currentRequestId,
        handleServiceId,
        currentServiceId,
        handleRequestId,
        logout,
        serviceData,
        setServiceData,
        handleChange,
        stateMap,
        favMap,
        stateNames,
        currState,
        setCurrState,
        handleRejectNo,
        rejectNo,
        deliveryDate,
        handleDeliveryDate,
        ratingDetail,
        handleRating,
        deliveryLocation,
        handleDeliveryLocation
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}