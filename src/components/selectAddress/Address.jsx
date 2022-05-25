import { useState, useEffect } from 'react'
import './address.css'
import Loading from '../Loading'
import { getState,getCity } from '../../apis/location'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext'
import Dropdown from '../dropdown/Dropdown'
import { ButtonN, Input } from '../../style'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../utils/init-firebase'

const Address = ({setAddressClick}) => {

    const { currentUser } = useAuth()
    

    const [loading, setLoading] = useState(false)
    const [addressData, setAddressData] = useState('')

    const addAddress = () => {
        if (!addressData) {
            alert('fill address')
            return
        }

        const ref = doc(db, 'users', currentUser.uid)
        setLoading(true)
        updateDoc(ref, {
            location: arrayUnion(addressData)
        }).then(() => console.log('updated'))
            .catch(err => console.log(err.code))
            .finally(() => {
                setAddressClick(false)
                setLoading(false)
            })
    }
   
    return (
        <div className='request-modal-component'>
            {loading ? <Loading /> :
                <div className='request-modal-container'>
                    <div className="request-modal-description">
                        <div style={{display: 'flex', flexDirection: 'column', paddingTop: '30px'}}>
                            <label style={{paddingBottom: '20px'}}>Enter address detail</label>
                            <Input type='text' value={addressData} onChange={(e) => setAddressData(e.target.value)} />
                        </div>
                    </div>
                    <div className="request-modal-btn">
                        <ButtonN onClick={addAddress} className='request-modal-btn-ok'>Add</ButtonN>
                        <ButtonN onClick={() => setAddressClick(false) } className='request-modal-btn-cancel'>Cancel</ButtonN>
                    </div>
                </div>
            }
    
        </div>
    )
}

export default Address