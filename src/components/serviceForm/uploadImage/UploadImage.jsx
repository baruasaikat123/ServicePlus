import './uploadImage.css'
import {useState} from 'react'
import { ButtonN, Input } from '../../../style'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import { FaTimes } from 'react-icons/fa'
import Loading from '../../Loading'


const UploadImage = ({loading}) => {

    // const [image, setImage] = useState('')

    // const upload = (e) => {
    //     const files = e.target.files
    //     console.log(files);
    // }

    // const handleUpload = () => {
    //     const btn = document.querySelector('#default-btn')
    //     btn.click()
    // }

    if (loading) return <Loading />
    
    return (
        
        <>
            <p style={{ padding: '50px', fontSize: '20px', fontWeight: 'bold' }}>
                Before submitting, make sure you will put all the correct information.
            </p>
        </>
        // <div className='upload'>
        //     <div className='upload-wrapper'>
        //         <div className='upload-container'>
        //             <div className='upload-icon'><AiOutlineCloudUpload /></div>
        //             <div className='upload-text'>No file chosen, yet!</div>
        //         </div>
        //         <div className='upload-cancel-btn'><FaTimes /></div>
        //         <div className='upload-file-name'>File name here</div>
        //     </div>
        //     <input id='default-btn' type="file" hidden/>
        //     <ButtonN onClick={ handleUpload } className='upload-btn'>Choose an image</ButtonN>
        // </div>
       
    )
}

export default UploadImage