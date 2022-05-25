import './fabMenu.css'
import { IoMdAdd } from 'react-icons/io'
import ToolTip from '../toolTip/ToolTip'
import { IconContext } from 'react-icons'
import { useState } from 'react'

const FabMenu = ({ setClick }) => {

    const [show, setShow] = useState(false)
  

    return (
        <>
            <div className='tool-tip'>
                {show && <ToolTip text={'Add Service'} />}
            </div>
            <IconContext.Provider value={{color: 'white', size: '25px',}}>
                <div className='fab-menu-container'
                    onClick={() => setClick(true)}
                    onMouseEnter={() => setShow(true)}
                    onMouseLeave={() => setShow(false)}
                >
                <IoMdAdd />
                </div>
            </IconContext.Provider>
        </>
          
    )
}

export default FabMenu