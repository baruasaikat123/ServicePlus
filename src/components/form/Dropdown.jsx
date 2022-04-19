import React, { useState } from 'react'
import {
    DropdownContainer,
    DropdownBtn,
    DropdownContent,
    DropdownItem,
} from './formStyle'

import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'

const Dropdown = ({text, userData, setUserData, h, w, options, data}) => {

    const [isActive, setIsActive] = useState(false)
    //const options = ['Male', 'Female', 'Other']
    //console.log(text);

    return (
        <DropdownContainer w={w}>
            <DropdownBtn onClick={() => setIsActive(!isActive)}>
                { data ? data : text } {!isActive ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
            </DropdownBtn>
            {isActive && (
                <DropdownContent h={h}>
                    {options && options.map((option, key) => (
                        <DropdownItem
                            key={key}
                            onClick={(e) => {
                                setUserData({ ...userData, [text] : e.target.textContent })
                                setIsActive(false)
                            }}
                        >
                            {option}
                        </DropdownItem>
                    ))}
                </DropdownContent>
            )}
        </DropdownContainer>
    )
}

export default Dropdown