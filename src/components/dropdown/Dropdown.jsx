import './dropdown.css'
import { useState } from 'react'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { useAuth } from '../../contexts/AuthContext'

const Dropdown = ({text, data, options}) => {

    const [isActive, setIsActive] = useState(false)
    const { setServiceData, serviceData } = useAuth()

    const handleClick = () => {
        setIsActive(!isActive)
    }

    return (
        <div className="dropdown">
            <div className="dropdown-selected"
                onClick={handleClick}
            >
                {data ? data : text} {isActive ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
            </div>
           {isActive && <div className="dropdown-content">
                {options.map((option,key) => (
                    <div key={key}
                        className="dropdown-item"
                        onClick={(e) => {
                            setServiceData({ ...serviceData, [text]: e.target.textContent })
                            setIsActive(false)   
                        }}
                    >
                        {option}
                    </div>
                ))}
            </div>}
            
        </div>
    )
}

export default Dropdown