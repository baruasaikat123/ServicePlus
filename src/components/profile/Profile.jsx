import './profile.css'
import ProfilePic from '../../images/user.png'
import LocationPic from '../../images/placeholder.png'
import MemberPic from '../../images/member.png'
import MobilePic from '../../images/smartphone.png'
import EmailPic from '../../images/gmail.png'
import AvailablePic from '../../images/checked.png'
import NotAvailablePic from '../../images/remove.png'
import {Input} from '../../style'
import { useSelector } from 'react-redux'
import Sidebar from '../sidebar/Sidebar'

const Profile = () => {

    const currentUser = useSelector((state) => state.currentUser)

    //console.log(currentUser);

    let status = 'Available'
    return (
        <div style={{display: 'flex'}}>
            <Sidebar />
            <div className='profile-container'>
                <div className='profile-pic-container'>
                    <img src={ProfilePic} alt={'profile-pic'} />
                    <p>saikatbarua</p>
                </div>
                <div className='profile-basic-info'>
                    <div className='profile-basic-heading'>
                        <img src={MemberPic} alt={'member-pic'} />
                        <p>Member Since</p>
                    </div>
                    <h4>April 2022</h4>
                </div>
                <div className='profile-basic-info'>
                    <div className='profile-basic-heading'>
                        <img src={LocationPic} alt={'location-pic'} />
                        <p>From</p>
                    </div>
                    <h4>West Bengal</h4>
                </div>
                <div className='profile-basic-info'>
                    <div className='profile-basic-heading'>
                        <img src={MobilePic} alt={'mobile-pic'} />
                        <p>Mobile</p>
                    </div>
                    <h4>+91 8597430895</h4>
                </div>
                <div className='profile-basic-info'>
                    <div className='profile-basic-heading'>
                        <img src={EmailPic} alt={'email-pic'} />
                        <p>Email</p>
                    </div>
                    <h4>Not Mentioned</h4>
                </div>
                <div className='profile-basic-info'>
                    <div className='profile-basic-heading'>
                        <img src={ status === 'Available' ? AvailablePic: NotAvailablePic} alt={'availablepic'} />
                        <p>Status</p>
                    </div>
                    <h4>{status}</h4>
                </div>
            </div>

        </div>
        
        
    )
}

export default Profile