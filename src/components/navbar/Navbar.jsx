import { Link } from 'react-router-dom'
import Logo from '../../images/app-logo.png'
import { items } from './navItems'
import { useEffect, useState } from 'react'
import AppModal from '../modal/AppModal'
import { APP_NAME } from '../../constants'
import { useDispatch, useSelector } from 'react-redux'
import { setModal } from '../../redux/actions/modalAction'
import { FaBars, FaTimes } from 'react-icons/fa'
import './navbar.css'
import { ButtonN } from '../../style'
import { useAuth } from '../../contexts/authContext'

const Navbar = () => {

    //const [openModal, setOpenModal] = useState(false)
    const [mobileClick, setMobileClick] = useState(false)
    //const modalValue = useSelector((state) => state.modalValue)
    const dispatch = useDispatch()
    const {authModalClick, handleAuthModal} = useAuth()

    const closeMobileMenu = () => {
        setMobileClick(false)
    }

    useEffect(() => {
        document.title = 'ServicePlus'
    },[authModalClick])


    return (
        <>
            {authModalClick && <AppModal/>}

            <div className='navbar'>
                <div className='navbar-container container'>
                    <Link to="/" className='navbar-logo'>
                        {APP_NAME}
                        <img src={ Logo } alt="logo" className='navbar-icon'/>
                    </Link>
                    <div className='mobile-icon' onClick={() => setMobileClick(!mobileClick)}>
                        {!mobileClick ? <FaBars/> : <FaTimes />}
                    </div>
                    <ul className={mobileClick ? 'nav-menu active' : 'nav-menu'}>
                        
                        {items.map((item) => {
                            return (
                                <li className='nav-item' key={item.id} onClick={closeMobileMenu}>
                                    <Link className='nav-links' to={item.url}>{item.title}</Link>
                                </li>
                            )
                        })}

                        <Link className='nav-btn-link'>
                            <ButtonN className='nav-btn' onClick={() => handleAuthModal(true)}>Register/Login</ButtonN>
                        </Link>
                    </ul>
                
                </div>
            </div>
            
        </>
        
    )
}

export default Navbar