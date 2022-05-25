import { useEffect, useState } from "react"
import { AuthButtonN, AuthInput, AuthText, AuthTextError } from "../authStyle"
import validator from 'validator'

const ForgotPassword = ({ setForgotPassword }) => {

    
    
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
    }


    return (
        <>
            <AuthTextError>
               
            </AuthTextError>
            <div>
                <AuthInput
                    type="email"
                    placeholder="Enter email *"
                    value={email}
                    onBlur={checkInputs}
                    onChange={(e) => setEmail(e.target.value)}
                />
                 <AuthTextError>
                    { emailError && emailErrorText }
                </AuthTextError>
                
            </div>
                <AuthText>
                    <p style={{color: 'var(--app-blue)'}} onClick={ () => setForgotPassword(false) }>cancel</p>
                </AuthText>
            <AuthButtonN
                onClick = { handleSubmit }
            >
                Submit
                {/* {user.loading ? <div className="loader" /> : 'Submit'} */}
            </AuthButtonN>
        </>
      
    )
}

export default ForgotPassword