import { useState } from "react"
import { formTitles } from "../../constants"
import {
    FormTitle,
    FormTitleContainer,
    FormStep,
    FormTitleText,
    DoneIcon,
    FormButtonContainer,
    BackButton
} from "./userDeatail"


import BasicInfo from '../../components/form/BasicInfo'
import ServiceInfo from '../../components/form/ServiceInfo'
import UploadPic from '../../components/form/UploadPic'


const UserDetail = () => {

    const [step, setStep] = useState(1)

    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        gender: '',
        address: '',
        state: '',
        city: '',
        category: ''
    
    })

    const handleChange = (e) => {
        let name = e.target.name
        let value = e.target.value
        setUserData({...userData, [name]:value})
    }
   

    const displayFormComponent = () => {
        switch (step) {
            case 1: return <BasicInfo userData={userData} setUserData={setUserData} handleChange={handleChange} step={step} setStep={setStep}/>
            case 2: return <ServiceInfo userData={userData} setUserData={setUserData} handleChange={handleChange} step={step} setStep={setStep} />
            case 3: return <UploadPic />
            default: return
        }
    }

    return (
        <>
            <FormTitle>
                
                {formTitles.map((title,key) => (
                    <FormTitleContainer key={key}>
                        <FormStep>
                             { step-1 > key || step === formTitles.length+1? <DoneIcon /> : `${key+1}`}
                        </FormStep>
                        <FormTitleText>{ title }</FormTitleText>
                    </FormTitleContainer>
                ))}
            </FormTitle>
            <div style={{margin: '80px'}}>
                <div>
                    {displayFormComponent()}
                </div>
                <FormButtonContainer>
                    <BackButton onClick={() => setStep(step-1)}step={step}><span>back</span></BackButton>
                </FormButtonContainer>
                    
            </div>
        </>
    )
}

export default UserDetail