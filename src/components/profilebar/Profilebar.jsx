import './profilebar.css'
import ProfilePic from '../../images/my.jpg'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import Logo from '../../images/app-logo.png'

const Profilebar = () => {

    const [click, setClick] = useState(false)

    const { logout } = useAuth()

    const handleClick = () => {
        setClick(!click)
    }

    return (
        <>
            <div className='profilebar'>
                <div className="profilebar-container">
                    <Link to="/" className='navbar-logo'>
                        SERVICEPLUS
                        <img src={ Logo } alt="logo" className='navbar-icon'/>
                    </Link>
                    <ul className='profilebar-item-menu'>
                        <li className='profilebar-item'>
                            <Link to='/services/category' className='profilebar-item-links'>Services</Link>
                            <Link to='/' className='profilebar-item-links'>Home</Link>
                        </li>
                    </ul>
                    <div className='profilebar-item-container'>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <img style={{borderRadius: '100px'}} onClick={handleClick} src={ProfilePic} alt={'profile-pic'} />
                            {click && <div className='profilebar-dropdown'>
                                <Link className='profilebar-dropdown-item' to='/profile'><p>Dashboard</p></Link>
                                <div onClick={ logout } className='profilebar-dropdown-item'><p>Logout</p></div>
                            </div>}
                        </div>
                    </div>
                    
                </div>
            
            </div>
          
        </>
    )
}

export default Profilebar