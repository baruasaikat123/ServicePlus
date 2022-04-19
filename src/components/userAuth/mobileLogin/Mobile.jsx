import { AuthButtonN, AuthInput, AuthText, AuthTextError } from "../authStyle"
import { RecaptchaVerifier, signInWithPhoneNumber} from "firebase/auth"
import { auth } from "../../../utils/init-firebase"
import { useState } from "react"

const Mobile = ({ setMobile }) => {
    
    const setLimitPhone = (e) => {
        if(e.target.value.length === 10) e.preventDefault()
    }

    const setLimitOtp = (e) => {
        if(e.target.value.length === 6) e.preventDefault()
    }

    const [phone, setPhone] = useState('')
    const [otpSent, setOtpSent] = useState(false)
    const [otp, setOtp] = useState('')
    const [phoneError, setPhoneError] = useState(false)
    const [phoneErrorText, setPhoneErrorText] = useState('')

    const validateInputs = () => {

        if (!phone) {
            setPhoneError(true)
            setPhoneErrorText('required field')
            return false
        }

        if (phone.length < 10) {
            setPhoneError(true)
            setPhoneErrorText('phone no. must be  of 10 digits')
            return false
        }

        return true
    }

    const checkInputs = () => {

        if (phone && phone.length===10) {
            setPhoneError(false)
        }
    }


    const setRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',{
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
            }
        }, auth);

    }

    const requestOtp = () => {

        const check = validateInputs()
        if (!check) return
        
        setRecaptcha()
        const appVerifier = window.recaptchaVerifier
        const phoneNo = '+91' + phone
        signInWithPhoneNumber(auth, phoneNo, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult
                setOtpSent(true)
            
            }).catch((error) => {

                console.log(error)
                
            })
    }

    const verifyOtp = () => {
        const confirmationResult = window.confirmationResult
        confirmationResult.confirm(otp).then((result) => {
            console.log(result.user.phoneNumber);
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <>
            <AuthTextError>
            
            </AuthTextError>
            <div>
                <div style={{display: 'flex'}}>
                    <AuthInput disabled style={{ width: '18%', marginRight: '10px', }}
                        type="number"
                        placeholder="+91" 
                        
                    />
                    <AuthInput type="number"
                        onKeyPress={setLimitPhone}
                        placeholder="Enter mobile no" 
                        value={phone}
                        onBlur={checkInputs}
                        onChange={(e) => setPhone(e.target.value)}
                        
                    />
                </div>
                <AuthTextError>
                    { phoneError && phoneErrorText }
                </AuthTextError>
            </div>
            <AuthInput
                style={{display: !otpSent ? 'none' : 'block'}}
                type="number"
                onKeyPress={setLimitOtp}
                placeholder="Enter otp" 
                value={otp}
                onBlur={checkInputs}
                onChange = {(e) => setOtp(e.target.value)}
            />
            <AuthText>
                <p style={{ color: 'var(--app-red)' }} onClick={() => setMobile(false)}>
                    Continue with email
                </p>
            </AuthText>
            <AuthButtonN
                onClick={ () => {
                    if (otpSent) verifyOtp()
                    else requestOtp()
                }}
            >
                { otpSent ? 'Verify OTP' : 'Request OTP'}
            </AuthButtonN>
            <div id="recaptcha-container"></div>
        </>
      
    )
}

export default Mobile