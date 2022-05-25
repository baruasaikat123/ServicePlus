import { Link } from 'react-router-dom'
import Logo from '../../images/app-logo.png'
import { items } from './navItems'
import { useEffect, useState } from 'react'
import AppModal from '../modal/AppModal'
import { APP_NAME } from '../../constants'
import { FaBars, FaTimes } from 'react-icons/fa'
import './navbar.css'
import { ButtonN } from '../../style'
import { useAuth } from '../../contexts/AuthContext'
import Loading from '../Loading'

const Navbar = () => {

    const { currentUser, logout, authModalClick, handleAuthModal } = useAuth()

    const [mobileClick, setMobileClick] = useState(false)

    //const [loading, setLoading] = useState(true)
  

    const closeMobileMenu = () => {
        setMobileClick(false)
    }

   

    // useEffect(() => {
    //     document.title = 'ServicePlus'
    // }, [authModalClick])
    
    //const [loading, setLoading] = useState(false)

    return (
        <>
            {authModalClick && <AppModal/>}

            <div className='app-navbar'>
                <div className='app-navbar-container'>
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

                        {!currentUser && <div className='nav-btn-link'>
                            <ButtonN className='nav-btn' onClick={() => handleAuthModal(true)}>Register/Login</ButtonN>
                        </div>}

                        {currentUser && <div className='nav-btn-link'>
                            <ButtonN className='nav-btn' onClick={logout}>Logout</ButtonN>
                        </div>}
                        
                    </ul>
                
                </div>
            </div>
            
        </>
        
    )
}

export default Navbar