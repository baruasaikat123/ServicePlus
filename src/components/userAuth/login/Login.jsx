import { AuthButtonN, AuthInput, AuthText, AuthTextError } from "../authStyle"
import { useEffect, useState } from "react"
import validator from 'validator'
import { useAuth } from "../../../contexts/AuthContext"
import useMounted from "../../../hooks/useMounted"

const Login = ({ setMobile, setForgotPassword }) => {

    document.title = 'Login here'

  

    const { login, handleAuthModal } = useAuth()
    const mounted = useMounted()
    
    const initialValue = { email: "", password: "" }
    const [userValues, setUserValues] = useState(initialValue)

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setUserValues({...userValues, [name]:value})
    }

    const [loading, setLoading] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [emailErrorText, setEmailErrorText] = useState('')
    const [passwordErrorText, setPasswordErrorText] = useState('')
    const [loginError, setLoginError] = useState(false)
    const [loginErrorText, setLoginErrorText] = useState('')

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

        if(!email || !validateEmail(email)) return false
    
        return true
    }

    const checkInputs = () => {

        if (email) {
            setEmailError(false)
        }
        if (password) {
            setPasswordError(false)
        }
    }

    const handleLoginUser = () => {

        const check = validateInputs()

        if (check) {
            setLoading(true)
            login(email, password)
                .then(() => {
                    handleAuthModal(false)
                })
                .catch(err => {
                    setLoginError(true)
                    setLoginErrorText(err.code)
                })
            .finally(() =>  mounted.current && setLoading(false))
        }

    }

    return (
        <>
            <AuthTextError>
               {loginError && loginErrorText}
            </AuthTextError>
            
                <div>
                    <AuthInput
                        name='email'
                        type="email"
                        value={userValues.email}
                        onChange={handleChange}
                        onBlur={checkInputs}
                    
                        placeholder="Enter email *" 
                    />
                    <AuthTextError>
                        { emailError && emailErrorText }
                    </AuthTextError>
                </div>
                <div>
                    <AuthInput
                        name='password'
                        type="password"
                        placeholder="Enter password *"
                        value={userValues.password}
                        onChange={handleChange}
                        onBlur={checkInputs}    
                    />
                    <AuthTextError>
                        { passwordError && passwordErrorText }
                    </AuthTextError>
                </div>
                <AuthText>
                    <p style={{color: 'var(--app-blue)'}}onClick={ () =>  setForgotPassword(true) }>Forgot Password ?</p>
                    <p style={{color: 'var(--app-red)'}} onClick={() => setMobile(true)}>Continue using mobile</p>
                </AuthText>
                <AuthButtonN onClick={ handleLoginUser } >
                    {loading ? <div className="loader" /> : 'Login'}
                </AuthButtonN>
            
        </>
    )
}

export default Login