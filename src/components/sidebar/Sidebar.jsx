import { useState } from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'
import { items } from './sidebarElements'
import { BsArrowRightSquare, BsArrowLeftSquare } from 'react-icons/bs'

const Sidebar = () => {

    const [showSidebar, setShowSidebar] = useState(false)

    const handleSidebar = () => {
        setShowSidebar(!showSidebar)
    }

    return (
        <div className='sidebar-component'>
            <div onClick={handleSidebar} className='sidebar-icon-container'>
                {!showSidebar ? <BsArrowRightSquare/> : <BsArrowLeftSquare />}
            </div>
            <div className={ showSidebar ? 'sidebar-container mobile' : 'sidebar-container'}>
                {items.map((item, key) => (
                    <Link to={ item.url } key={key} className='sidebar-element'><p>{item.name}</p></Link>
                ))}
            </div>
        </div>
    )
}

export default Sidebar