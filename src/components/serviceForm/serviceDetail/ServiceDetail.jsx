import './serviceDetail.css'
import { Input } from '../../../style'
import { useAuth } from '../../../contexts/AuthContext'

const ServiceDetail = () => {

    const { serviceData, handleChange } = useAuth()

    const setLimit = (e) => {
        if(e.target.value.length === 2) e.preventDefault()
    }
    return (
        <div className='service-detail-container'>
            <div className='input-info'>
                <label>Describe your service in detail:</label>
                <textarea
                    rows={10} cols={80}
                    name='detailInfo'
                    value={serviceData.detailInfo} 
                    onChange={handleChange}
                    />
            </div>
            <div className='input-info'>
                <label>Specify years of experience: (Enter 0 if not)</label>
                <Input
                    type="number"
                    onKeyPress={setLimit}
                    name='experience'
                    value={ serviceData.experience }
                    onChange={handleChange}
                    style={{ marginLeft: '10px', marginTop: '10px', width: '100px' }} />
            </div>
            <div className='input-info'>
                <label>Specify fees:(&#8377;)</label>
                <Input
                    type="number"
                    name='fees'
                    value={ serviceData.fees }
                    onChange={handleChange}
                    style={{ marginLeft: '10px', marginTop: '10px', width: '200px' }} />
            </div>
            <div className='select-info'>
               
            </div>
            <div className='input-info'>
                
            </div>
        </div> 
    )
}

export default ServiceDetail