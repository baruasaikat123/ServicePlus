import './requestmodal.css'
import { ButtonN, Input } from '../../style'
import { collection, onSnapshot, where, query, doc, deleteDoc, updateDoc, arrayRemove, addDoc, arrayUnion, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../utils/init-firebase'

const RequestModal = ({ acceptClick, setAcceptClick, setRejectClick, id, rid, requests }) => {

   

    const handleRequests = () => {
   
        const ref = doc(db, 'service_request', id)

        updateDoc(ref, {
            requestId: arrayRemove(rid)
        })
            .then(() => {
                console.log('deleted')
                fun()
                
                requests.splice(requests.indexOf(rid), 1)
                if (acceptClick) setAcceptClick(false)
                else setRejectClick(false)
        })
            .catch(err => console.log(err.message))   

    }

    const fun = async () => {

        const serviceRef = collection(db, 'service_history')
        const q = query(serviceRef, where('id', '==', '7SfuFjUAhfuPJxMtRxqc'))
        
        const snap = await getDocs(q)

        if (snap.docs.length > 0) {
            console.log('yes');
            updateDoc(doc(db,'service_history', snap.docs[0].id), {
                serviceId: arrayUnion(rid)
            })
                .then(() => console.log('update successfully'))
            .catch((err) => console.log(err.message))
        }

        else {
            addDoc(serviceRef, {
                id: '7SfuFjUAhfuPJxMtRxqc',
                serviceId: arrayUnion(rid)
            })
                .then((res) => {
                    console.log('added successfully')
                })
            .catch((err) => console.log(err.message))
        }

    }

    
    return (
        <div className='request-modal-component'>
            <div className={acceptClick ? 'request-modal-container' : 'request-modal-container reject'}>
                <div className="request-modal-description">
                    {acceptClick ? <h4>Before proceeding make sure you are avaiable at this specific date and time.</h4>
                        :
                        <>
                            <h4>Specify the reason</h4>
                            <textarea style={{height: '80px', width: '100%', padding: '15px'}}/>
                        </>
                    }
                </div>
                <div className="request-modal-btn">
                    <ButtonN
                        onClick={ handleRequests }
                        className='request-modal-btn-ok'>{acceptClick ? 'Yes, I am sure' : 'Yes, I want to Reject'}</ButtonN>
                    <ButtonN onClick={ acceptClick ? () => setAcceptClick(false) : () => setRejectClick(false)}
                        className='request-modal-btn-cancel'>Cancel</ButtonN>
                </div>
            </div>
        </div>
        
    )
}

export default RequestModal