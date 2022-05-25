import './addService.css'
import { ButtonN } from '../../style'
import ChooseCategory from '../../components/serviceForm/chooseCategory/ChooseCategory'
import { useState, useEffect } from 'react'
import BasicInfo from '../../components/serviceForm/basicInfo/BasicInfo'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'
import ServiceDetail from '../../components/serviceForm/serviceDetail/ServiceDetail'
import { useAuth } from '../../contexts/AuthContext'
import UploadImage from '../../components/serviceForm/uploadImage/UploadImage'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../utils/init-firebase'
import { categoryMap } from '../../pages/Services/categoryItems'
import { ToastContainer, toast } from 'react-toastify'

const AddService = ({ setClick }) => {

    const { serviceData, currentUser } = useAuth()
    
    const [step, setStep] = useState(1) 
    const [loading, setLoading] = useState(false)
    const [active,setActive] = useState(false)
    const heading = ['Choose a Category', 'Fill Basic Details', 'Fill your Service Details', 'Confirmation']

    const display = () => {
        switch (step) {
            case 1:
                return <ChooseCategory />
            
            case 2:
                return <BasicInfo />
            
            case 3:
                return <ServiceDetail />
            
            case 4:
                return <UploadImage loading={loading} />
        
            default:
                return
        }
    }


    const handleCheck = () => {

        if (step === 1) {
            if (serviceData.category === null) {
                toast.error('please select a category to continue', {
                    autoClose: 2000
                })
                return
            }
            if (serviceData.days.length === 0) {
                toast.error('please choose at least one day', {
                    autoClose: 2000
                })
                return
            }
        }

        if (step === 2) {
            if (serviceData.name === '') {
                toast.error('please specify your name to continue', {
                    autoClose: 2000
                })
                return
            }
            if (serviceData.gender === null) {
                toast.error('please select a gender to continue',{
                    autoClose: 2000
                })
                return
            }
            if (serviceData.address === '') {
                toast.error('please select your location to continue',{
                    autoClose: 2000
                })
                return
            }
            if (serviceData.state === null) {
                toast.error('please select state to continue',{
                    autoClose: 2000
                })
                return
            }
            if (serviceData.city === null) {
                toast.error('please select city to continue',{
                    autoClose: 2000
                })
                return
            }
            if (serviceData.pincode === null) {
                toast.error('please specify available area pincode',{
                    autoClose: 2000
                })
                return
            }
            if (serviceData.serviceAbout === '') {
                toast.error('please specify a brief intro about your service to continue',{
                    autoClose: 2000
                })
                return
            }
        }

        if (step === 3) {
            if (serviceData.detailInfo === '') {
                toast.error('please specify your services in detail',{
                    autoClose: 2000
                })
                return
            }
            if (serviceData.experience === '') {
                toast.error('please specify your experience',{
                    autoClose: 2000
                })
                return
            }
            if (serviceData.fees === '') {
                toast.error('please specify your fees',{
                    autoClose: 2000
                })
                return
            }
        }

        if (step === 4) {
            setActive(true)
        }
        else {
            setStep(step + 1)
        }
    }

    const publishService = () => {
        setLoading(true)
            const ref = collection(db, 'services')
            addDoc(ref, {
                category: categoryMap[serviceData.category],
                displayName: serviceData.name,
                location: {
                    address: serviceData.address,
                    state: serviceData.state,
                    city: serviceData.city,
                    pin: serviceData.pincode
                },
                status: 'A',
                requests: [],
                serviceInfo: serviceData.serviceAbout,
                serviceDetail: serviceData.detailInfo,
                experience: serviceData.experience,
                fees: serviceData.fees,
                days: serviceData.days,
                totalRating: {
                    avgRating: 3.2,
                    totalNoUser: 20
                },
                userId: currentUser.uid
            }).then(() => {
                setClick(false)
                toast.success('Service Created Successfully!',{
                    autoClose: 2000
                })
            })
                .catch((err) => console.log(err.message))
            .finally(() => setLoading(false))
    }

    useEffect(() => {

        if (active) {
            publishService()
        }

        return () => setActive(false)
    },[active])

    return (
        <> <ToastContainer position={toast.POSITION.TOP_CENTER}  />
        <div className='add-service-component'>
            <div className='add-service-container'>
                <div className='add-service-heading'>
                    <h3>{heading[step-1]}</h3>
                    <div onClick={() => setClick(false)} className='add-service-close-btn'>X</div>
                </div>
                {display()}
                <div className='add-service-btn'>
                    <ButtonN className={step === 1 ? 'add-service-btn-prev disable' : 'add-service-btn-prev'}
                        onClick={() => setStep(step - 1)}
                        disabled={loading && 'enable'}
                    >
                        <BsArrowLeft />Prev</ButtonN>
                    <ButtonN
                        className={'add-service-btn-next'}
                        onClick={ handleCheck }>
                        {step === 4 ? 'Submit' : 'Next'}{step <= 3 && <BsArrowRight />}
                    </ButtonN>
                </div>
            </div>
        </div></>
    )
}

export default AddService