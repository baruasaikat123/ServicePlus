import { ActionTypes } from "../actionType"
import { auth } from "../../utils/init-firebase"

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
} from "firebase/auth"

export const setCurrentUser = (user) => {
    return {
        type: ActionTypes.SET_CURRENT_USER,
        payload: user
    }
}

export const registerUser = (email, password) => {
    let message = ''
    return function (dispatch) {
        dispatch({
            type: ActionTypes.REGISTER_INITIATE,
            payload: true
        })
        createUserWithEmailAndPassword(auth, email, password)
            .then((response) => {
                //console.log(response);
                dispatch({
                    type: ActionTypes.REGISTER_SUCCESS,
                    payload: 'Registered Successfully'
                })
            }).catch((err) => {
                switch (err.code) {
                    case 'auth/email-already-in-use':
                        message = 'Email already in use.'
                        break;
                    case 'auth/weak-password':
                        message = 'password length should be at least 6'
                        break;
                    default:
                }
            dispatch({
                type: ActionTypes.REGISTER_ERROR,
                payload: message
            })
        })
    }
}

export const loginUser = (email, password) => {
    let message = ''
    return function (dispatch) {
        dispatch({
            type: ActionTypes.LOGIN_INITIATE,
            payload: true
        })
        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                dispatch({
                    type: ActionTypes.LOGIN_SUCCESS,
                    payload: 'Login Successfull'
            })
            }).catch((err) => {
                switch (err.code) {
                    case 'auth/user-not-found':
                        message = 'Sorry! user not found'
                        break
                    case 'auth/wrong-password':
                        message = 'wrong credential. try again!'
                        break
                    default:
                }
                dispatch({
                    type: ActionTypes.LOGIN_ERROR,
                    payload: message
                })
            
            })
            // .finally(() => mounted.current && dispatch())
    }
}

export const googleAuth = () => {
    return function (dispatch) {
        signInWithPopup(auth, new GoogleAuthProvider())
            .then((response) => {
            console.log(response)
            }).catch((error) => {
                console.log(error)
                dispatch({
                    type: ActionTypes.GOOGLE_AUTH,
                    payload: error.code
                })
            })
    }
}

export const forgotPassword = (email) => {
    return function (dispatch) {
        dispatch({
            type: ActionTypes.FORGOT_PASSWORD_INITIATE,
            payload: true
        })
        sendPasswordResetEmail(auth, email,{ url: 'http://localhost:3000' })
            .then((response) => {
                dispatch({
                    type: ActionTypes.FORGOT_PASSWORD_SUCCESS,
                    payload: 'A password reset link has been sent to your email.'
                })
            }).catch((error) => {
                dispatch({
                    type: ActionTypes.FORGOT_PASSWORD_ERROR,
                    payload: error.code
                })
            })
    }
}

export const removeError = () => {
    return {
        type: ActionTypes.REMOVE_ERROR
    }
}

// export const requestOtp = (phone) => {
//     return (function (dispatch) {
//         dispatch({
//             type: ActionTypes.MOBILE_INITIATE,
//             payload: true
//         })
//         window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container',{
//             'size': 'invisible',
//             'callback': (response) => {
//               // reCAPTCHA solved, allow signInWithPhoneNumber.
//             }
//         }, auth);

//         const appVerifier = window.recaptchaVerifier
//         const phoneNo = '+91' + phone
//         signInWithPhoneNumber(auth, phoneNo, appVerifier)
//             .then((confirmationResult) => {
//                 window.confirmationResult = confirmationResult
//                 //setOtpSent(true)
//                 dispatch({
//                     type: ActionTypes.OTP_SENT_SUCCESS,
//                     payload: true
//                 })
            
//             }).catch((error) => {
//                 console.log(error)
//                 window.recaptchaVerifier.render().then(function(widgetId) {
//                     window.recaptchaVerifier.reset(widgetId);
//                 })
//             })
//     })
// }