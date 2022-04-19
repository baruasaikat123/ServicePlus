import './dropdown.css'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { useState } from 'react'
const DropdownLayout = () => {

    const [isActive, setIsActive] = useState(false)

    const options = []


    return (
        <div className="select-box">
        {isActive && <div className="options-container active">
            <div className="option">
                <input
                type='radio'
                className='radio'
                name='category'
                id='male' />
                <label htmlFor='male'>Male</label>
            </div>
            <div className="option">
                <input
                type='radio'
                className='radio'
                name='category'
                id='female' />
                <label htmlFor='female'>Female</label>
            </div>
            <div className="option">
                <input
                type='radio'
                className='radio'
                name='category'
                id='other' />
                <label htmlFor='other'>Other</label>
            </div> 
        </div>}
        <div
            className="selected"
            onClick={() => setIsActive(!isActive)}
        >
            Select Service Category
            {!isActive ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
        </div>
        </div>
    )
}

export default DropdownLayout