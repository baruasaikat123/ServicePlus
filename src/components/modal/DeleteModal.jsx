import './deleteModal.css'
import { ButtonN } from '../../style'
import { deleteDoc, doc } from 'firebase/firestore'
import Loading from '../Loading'
import { db } from '../../utils/init-firebase'
import { useEffect, useState } from 'react'

const DeleteModal = ({ setDeleteClick, serviceId }) => {
    
    const [loading, setLoading] = useState(false)
    const [click, setClick] = useState(false)

    const deleteService = () => {
        const ref = doc(db, 'services', serviceId)
        setLoading(true)
        deleteDoc(ref)
            .then(() => {
                setDeleteClick(false)
            })
            .catch(err => console.log(err.message))
            .finally(() =>  setLoading(false))
    }
    
    useEffect(() => {
        if (click) {
            deleteService()
        }

        return () => setClick(false)

    },[click])


    return (
        <div className='dlt-modal-wrapper'>
            {loading ? <Loading /> :
                <div className="dlt-modal-container">
                    <div className='dlt-modal-description'>
                        <h4>Are you sure you want to delete ?</h4>
                    </div>
                    <div className="dlt-modal-btn">
                        <ButtonN onClick={() => setClick(true) } className='dlt-modal-btn-accept'>Yes, I am sure</ButtonN>
                        <ButtonN onClick={()=> setDeleteClick(false)} className='dlt-modal-btn-cancel'>Cancel</ButtonN>
                    </div>
                </div>
            }
        </div>
    )
}

export default DeleteModal