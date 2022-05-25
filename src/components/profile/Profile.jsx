import './profile.css'
import ProfilePic from '../../images/my.jpg'
import LocationPic from '../../images/placeholder.png'
import MemberPic from '../../images/member.png'
import MobilePic from '../../images/smartphone.png'
import EmailPic from '../../images/gmail.png'
import AvailablePic from '../../images/checked.png'
import NotAvailablePic from '../../images/remove.png'
import {Input} from '../../style'
import Sidebar from '../sidebar/Sidebar'
import Profilebar from '../profilebar/Profilebar'
import { useEffect, useState } from 'react'
import { onSnapshot, updateDoc } from 'firebase/firestore'
import { doc } from 'firebase/firestore'
import { db } from '../../utils/init-firebase'
import { useAuth } from '../../contexts/AuthContext'
import { BiEditAlt } from 'react-icons/bi'
import { MdOutlineEditOff } from 'react-icons/md'
import { ButtonN } from '../../style'
import Loading from '../Loading'

const Profile = () => {

    const { currentUser } = useAuth()
    
    const [userDetail, setUserDetail] = useState([])
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [clickName, setClickName] = useState(false)
    const [clickAddress, setClickAddress] = useState(false)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        document.title = 'Profile'
    },[])

    useEffect(() => {
        if (!currentUser) return
        
        const ref = doc(db, 'users', currentUser.uid)
        const unsubscribe = onSnapshot(ref,snapshot => {
            setUserDetail(snapshot.data())
        })

        return () => unsubscribe()
    }, [currentUser])

    
    const handleSave = () => {
        const ref = doc(db, 'users', currentUser.uid)
        setLoading(true)
        updateDoc(ref, {
            name: name ? name : userDetail.name,
            //address: address ? address : userDetail.location
        }).then(() => console.log('updated'))
            .catch(err => console.log(err.code))
            .finally(() => setLoading(false))
        
    }

    return (
        <div className='profile-wrapper'>
            <Profilebar />
            <div style={{ display: 'flex',}}>
                <Sidebar />
                {loading ? <div style={{display: 'flex', marginLeft: '45%', marginTop:'50px'}}><Loading  /></div> :
                    <div className="profile-container">
                        <div className='profile-pic-container'>
                            <img src={ProfilePic} alt={'profile-pic'} />
                        </div>
                 
                        <div className='profile-field-container'>
                            <h4>Display Name:</h4>
                            {!clickName ? <p>{name ? name : userDetail.name}</p> :
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)} />}
                            {!clickName ? <BiEditAlt
                                onClick={() => {
                                    setClickName(!clickName)
                                    name ? setName(name) : setName(userDetail.name)
                                }}
                                className='profile-edit-icon' /> : <MdOutlineEditOff onClick={() => setClickName(!clickName)} className='profile-edit-icon' />}
                        </div>
                        {/* <div className='profile-field-container'>
                            <h4>Address Detail:</h4>
                            {!clickAddress ? <p>{address ? address : userDetail.location}</p> :
                                <Input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)} />}
                            {!clickAddress ?
                                <BiEditAlt
                                    onClick={() => {
                                        setClickAddress(!clickAddress)
                                        address ? setAddress(address) : setAddress(userDetail.address)
                                    }}
                                    className='profile-edit-icon' /> : <MdOutlineEditOff onClick={() => setClickAddress(!clickAddress)} className='profile-edit-icon' />}
                        </div> */}
                        <ButtonN className='profile-save-btn' onClick={handleSave}>Save</ButtonN>
                    </div>}
            </div>
        </div>
    )


    //console.log(currentUser);
    // let status = 'Available'
    // return (
    //     <><Profilebar />
    //     <div style={{ display: 'flex' }}>
    //         <Sidebar/>        
    //         <div className='profile-container'>
    //             <div className='profile-pic-container'>
    //                 <img src={ProfilePic} alt={'profile-pic'} />
    //                 <p>saikatbarua</p>
    //             </div>
    //             <div className='profile-basic-info'>
    //                 <div className='profile-basic-heading'>
    //                     <img src={MemberPic} alt={'member-pic'} />
    //                     <p>Member Since</p>
    //                 </div>
    //                 <h4>April 2022</h4>
    //             </div>
    //             <div className='profile-basic-info'>
    //                 <div className='profile-basic-heading'>
    //                     <img src={LocationPic} alt={'location-pic'} />
    //                     <p>From</p>
    //                 </div>
    //                 <h4>West Bengal</h4>
    //             </div>
    //             <div className='profile-basic-info'>
    //                 <div className='profile-basic-heading'>
    //                     <img src={MobilePic} alt={'mobile-pic'} />
    //                     <p>Mobile</p>
    //                 </div>
    //                 <h4>+91 8597430895</h4>
    //             </div>
    //             <div className='profile-basic-info'>
    //                 <div className='profile-basic-heading'>
    //                     <img src={EmailPic} alt={'email-pic'} />
    //                     <p>Email</p>
    //                 </div>
    //                 <h4>Not Mentioned</h4>
    //             </div>
    //             <div className='profile-basic-info'>
    //                 <div className='profile-basic-heading'>
    //                     <img src={ status === 'Available' ? AvailablePic: NotAvailablePic} alt={'availablepic'} />
    //                     <p>Status</p>
    //                 </div>
    //                 <h4>{status}</h4>
    //             </div>
    //         </div>

    //     </div></>
        
}

export default Profile