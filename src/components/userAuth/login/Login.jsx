import { AuthButtonN, AuthInput, AuthText, AuthTextError } from "../authStyle"
import { useEffect, useState } from "react"
import validator from 'validator'
import { useSelector, useDispatch } from "react-redux"
import { loginUser, removeError } from "../../../redux/actions/authAction"

const Login = ({ setMobile, setForgotPassword }) => {

    const dispatch = useDispatch()
    document.title = 'Login here'

    useEffect(() => {
        
        return () => {
            dispatch(removeError())
        }
    }, [dispatch])
    

    const user = useSelector((state) => state.loginUser)
    
    const initialValue = { email: "", password: "" }
    const [userValues, setUserValues] = useState(initialValue)

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setUserValues({...userValues, [name]:value})
    }

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [emailErrorText, setEmailErrorText] = useState('')
    const [passwordErrorText, setPasswordErrorText] = useState('')

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
            dispatch(loginUser(email,password))
        }
    }

    return (
        <>
            <AuthTextError>
                {user.error}
            </AuthTextError>
            <div>
                <AuthInput
                    name='email'
                    type="email"
                    value={userValues.email}
                    onChange={handleChange}
                    onBlur={checkInputs}
                    disabled={user.loading && 'enable'}
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
                    disabled={user.loading && 'enable'}
                />
                <AuthTextError>
                    { passwordError && passwordErrorText }
                </AuthTextError>
            </div>
         
            <AuthText>
                <p style={{color: 'var(--app-blue)'}}onClick={ () =>  setForgotPassword(true) }>Forgot Password ?</p>
                <p style={{color: 'var(--app-red)'}} onClick={() => setMobile(true)}>Continue using mobile</p>
            </AuthText>
            <AuthButtonN
                disabled={user.loading && 'enable'}
                onClick={ handleLoginUser }>
                {user.loading ? <div className="loader" /> : 'Login'}
            </AuthButtonN>
        </>
    )
}

export default Login