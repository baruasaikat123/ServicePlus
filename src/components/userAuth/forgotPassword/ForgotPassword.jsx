import { useEffect, useState } from "react"
import { AuthButtonN, AuthInput, AuthText, AuthTextError } from "../authStyle"
import validator from 'validator'
import { useDispatch, useSelector } from "react-redux"
import { forgotPassword, removeError } from "../../../redux/actions/authAction"

const ForgotPassword = ({ setForgotPassword }) => {

    const dispatch = useDispatch()

    useEffect(() => {

        return () => {
            dispatch(removeError())
        }
    }, [dispatch])
    
    const user = useSelector((state) => state.loginUser)
    
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false)
    const [emailErrorText, setEmailErrorText] = useState('')

    const validateEmail = (email) => {
        return validator.isEmail(email)
    }

    const validateInputs = () => {

        if (!email) {
            setEmailError(true)
            setEmailErrorText('required field')
            return false
        }

        if (!validateEmail(email)) {

            setEmailError(true)
            setEmailErrorText('email is badly formatted')
            return false
        }

        return true
    }

    const checkInputs = () => {

        if (email) {
            setEmailError(false)
        }
    }

    const handleSubmit = () => {

        const check = validateInputs()
        if (!check) return
        dispatch(forgotPassword(email))
    }


    return (
        <>
            <AuthTextError>
                {user.error ? user.error : user.success}
            </AuthTextError>
            <div>
                <AuthInput
                    type="email"
                    placeholder="Enter email *" 
                    value={email}
                    onBlur={checkInputs}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={user.loading && 'enable'}
                />
                 <AuthTextError>
                    { emailError && emailErrorText }
                </AuthTextError>
                
            </div>
                <AuthText>
                    <p style={{color: 'var(--app-blue)'}} onClick={ () => setForgotPassword(false) }>cancel</p>
                </AuthText>
            <AuthButtonN
                disabled={user.loading && 'enable'}
                onClick = { handleSubmit }
            >
                {user.loading ? <div className="loader" /> : 'Submit'}
            </AuthButtonN>
        </>
      
    )
}

export default ForgotPassword