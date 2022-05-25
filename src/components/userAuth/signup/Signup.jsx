import { useState } from "react"
import { AuthButtonN, AuthInput, AuthText, AuthTextError } from "../authStyle"
import validator from 'validator'
import { useAuth } from "../../../contexts/AuthContext"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import useMounted from "../../../hooks/useMounted"
import { addDoc, collection, doc, setDoc } from "firebase/firestore"
import { db } from "../../../utils/init-firebase"

const Signup = ({ setMobile }) => {

    const [isLoading, setIsLoading] = useState(false)
    const history = useHistory()
    
    const mounted = useMounted()

    const initialValue = { email: "", password: "" }
    const [userValues, setUserValues] = useState(initialValue)
    const [errorMsg, setErrorMsg] = useState('')
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [emailErrorText, setEmailErrorText] = useState('')
    const [passwordErrorText, setPasswordErrorText] = useState('')

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setUserValues({ ...userValues, [name]: value })
    }

    const { email, password } = userValues
    
    const validateEmail = (email) => {
        return validator.isEmail(email)
    }

    const validateInputs = () => {

        if (!email) {
            setEmailError(true)
            setEmailErrorText('required field')
        }

        else if (!validateEmail(email)) {

            setEmailError(true)
            setEmailErrorText('email is badly formatted')
            
        }

        if (!password) {
            setPasswordError(true)
            setPasswordErrorText('required field')
            return false
        }

        if (password.length <= 5) {
            setPasswordError(true)
            setPasswordErrorText('password length should be at least 6')
            return false
        }

        if(!email || !validateEmail(email)) return false
    
        return true
        
    }

    const checkInputs = () => {

        if (email) {
            setEmailError(false)
        }
        if (password && password.length>=6) {
            setPasswordError(false)
        }
    }

    const {register, handleAuthModal} = useAuth()

    const handleRegisterUser = () => {

        if (validateInputs()) {
            setIsLoading(true)
            register(email, password)
                .then((res) => {
                    handleAuthModal(false)
                    console.log(res.user.uid)
                    const ref = doc(db,'users',res.user.uid)
                    setDoc(ref, {})
                    history.push('/dashboard')
                }).catch((err) => {
                    setErrorMsg(err.code)
                }).finally(() => {
                    mounted.current && setIsLoading(false)
                })
        }
    }

    return (
        <>
            <AuthTextError>
                {errorMsg}
            </AuthTextError>
            <div>
                <AuthInput
                    type="email"
                    name='email'
                    placeholder="Enter email *"
                    value={userValues.email}
                    onChange={handleChange}
                    onBlur={checkInputs}
                    disabled={isLoading && 'enable'}
                />
                <AuthTextError>
                    { emailError && emailErrorText }
                </AuthTextError>
            </div>
            <div>
                <AuthInput
                    type="password"
                    name='password'
                    placeholder="Enter password *" 
                    value={userValues.password}
                    onChange={handleChange}
                    disabled={isLoading && 'enable'}
                    onBlur={checkInputs}
                />
                <AuthTextError>
                    { passwordError && passwordErrorText }
                </AuthTextError>
                
            </div>

            <AuthText>
                <p
                    style={{ color: 'var(--app-red)'}}
                    onClick={() => setMobile(true)}
                    disabled={isLoading && 'enable'}
                >
                    Continue using mobile
                </p>
            </AuthText>
            <AuthButtonN
                disabled={isLoading && 'enable'}
                onClick={ handleRegisterUser }>
                {isLoading ? <div className="loader" /> : 'Signup'}
            </AuthButtonN>
        </>
      
    )
}

export default Signup