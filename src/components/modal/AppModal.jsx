import {
    Modal,
    ModalContainer,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from './modalStyle'

import AuthLayout from '../userAuth/AuthLayout'

import { useState } from 'react'
import { setModal } from '../../redux/actions/modalAction'
import { useDispatch } from 'react-redux'
import { useAuth } from '../../contexts/authContext'

const AppModal = () => {
    
    const [login, setLogin] = useState(false)
    const [mobile, setMobile] = useState(false)
    const [forgotpassword, setForgotPassword] = useState(false)

    const handleLogin = () => {
        setLogin(!login)
        setMobile(false)
        setForgotPassword(false)
    }

    const dispatch = useDispatch()
    const { handleAuthModal } = useAuth()
    
    
    return (
        <Modal>
            <ModalContainer>
                <ModalHeader>
                    Join ServicePlus
                    <button onClick={() => handleAuthModal(false)}> X </button>
                </ModalHeader>
                <ModalBody>
                    <AuthLayout
                        login={login}
                        mobile={mobile}
                        setMobile={setMobile}
                        forgotpassword={forgotpassword}
                        setForgotPassword={setForgotPassword} />
                </ModalBody>
                <ModalFooter>
                    <p>{login === false ? 'Already have an account ? ' : "Don't have an account ? "}
                        <span onClick={handleLogin}>{login === false ? 'Login' : 'Join'}</span>
                    </p>
                </ModalFooter>
            </ModalContainer>
        </Modal>
      
    )
}

export default AppModal