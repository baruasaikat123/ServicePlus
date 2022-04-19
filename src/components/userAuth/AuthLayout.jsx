import { AuthContainer, AuthButtonOut, AuthDivider } from "./authStyle"
import Login from "./login/Login"
import Mobile from "./mobileLogin/Mobile"
import Signup from './signup/Signup'
import ForgotPassword from "./forgotPassword/ForgotPassword"
import googlePic from '../../images/google.png'
import facebookPic from '../../images/fb.png'
import { useDispatch } from "react-redux"
import { googleAuth } from '../../redux/actions/authAction'

const AuthLayout = ({
    login,
    mobile,
    setMobile,
    forgotpassword,
    setForgotPassword }) => {
    
    const dispatch = useDispatch()
    
    return (
        <AuthContainer>
            {forgotpassword ? <ForgotPassword setForgotPassword={setForgotPassword} />:
                mobile ? <Mobile setMobile={setMobile} />:
                login ? <Login setMobile={setMobile} setForgotPassword={setForgotPassword} /> : <Signup setMobile={setMobile} />
            }
            <AuthDivider><p>OR</p></AuthDivider>
            <AuthButtonOut
                style={{ border: '2px solid black' }}
                onClick = { () => dispatch(googleAuth())}
            >
                <img src={googlePic} alt="google" />
                Continue with Google
            </AuthButtonOut>
            <AuthButtonOut style={{ color: 'white', background: 'rgb(66 103 178)' }}>
                <img src={facebookPic} alt="facebook" />
                Continue with Facebook
            </AuthButtonOut>
        </AuthContainer>
  )
}

export default AuthLayout