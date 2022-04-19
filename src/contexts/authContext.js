import { createContext, useContext, useEffect, useState } from "react"
import { auth } from '../utils/init-firebase'
import { createUserWithEmailAndPassword } from "firebase/auth"

const AuthContext = createContext({
    currentUser: null,
    authModalClick: false,
    register: () => Promise,
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null)
    const [authModalClick, setAuthModalClick] = useState(false)
    const [currentRequestId, setCurrentRequestId] = useState(null)

    function handleAuthModal(value) {
        setAuthModalClick(value)
    }
    function handleRequestId(value) {
        setCurrentRequestId(value)
    }
    function register(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const value = {
        currentUser,
        authModalClick,
        handleAuthModal,
        register,
        currentRequestId,
        handleRequestId
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}