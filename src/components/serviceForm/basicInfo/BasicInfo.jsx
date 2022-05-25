import { Input } from '../../../style'
import { useAuth } from '../../../contexts/AuthContext'
import './basicInfo.css'
import Dropdown from '../../dropdown/Dropdown'
import { genderOptions } from '../../../constants'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getCity } from '../../../apis/location'

const BasicInfo = () => {
 
    const {
        serviceData,
        setServiceData,
        handleChange,
        stateMap,
        stateNames,
        currState,
        setCurrState } = useAuth()

    const headers = {
        'X-CSCAPI-KEY': 'OHA4MXJnWEJQalBFRkIzVkNoUjV2VWxtZ2dOYkJwR082Ym44N20ySA=='
    }

    const [cityNames, setCityNames] = useState([])

    const fetchCity = async (code) => {

        try {
            const { data } = await axios.get(getCity(code), {
                headers: headers
            })
    
            data.map((city) =>
                cityNames.push(city.name)
            )
        }
        catch (e) {
          console.log(e)
        }
        
    }

    useEffect(() => {

        if (serviceData.state !== currState) {
           
            console.log(serviceData.state);
            setServiceData({ ...serviceData, city: null })
            cityNames.length = 0
            setCurrState(serviceData.state)
        }
        fetchCity(stateMap.get(serviceData.state))
    }, [serviceData.state])


    return (
        <div className='basic-info-container'>
            <div className='input-info'>
                <label>Enter your name (which you want to display):&nbsp;</label>
                <Input style={{ width: '300px' }}
                    name='name'
                    value={serviceData.name}
                    onChange={handleChange}
                />
            </div>
            <div className='input-info'>
                <label>Select Gender</label>
                <Dropdown
                    text={'gender'}
                    data={serviceData.gender}
                    options={genderOptions} />
            </div>
            <div className='input-info'>
                <label>Enter your location (where you provide your service):&nbsp;</label>
                <Input style={{ width: '100%', marginTop: '10px' }} 
                    name='address'
                    placeholder='Enter your detail address'
                    value={serviceData.address}
                    onChange={handleChange}
                />
            </div>
            <div className='select-info'>
                <div>
                    <label>Select State</label>
                    <Dropdown
                        text={'state'}
                        data={serviceData.state}
                        options={stateNames} />
                </div>
                <div>
                    <label>Select City</label>
                    <Dropdown
                        text={'city'}
                        data={serviceData.city}
                        options={cityNames}
                    />
                </div>
            </div>
            <div className='input-info'>
                <label>Specify your available pincode:</label>
                <Input
                    type='number'
                    style={{ width: '30%', marginTop: '10px', marginLeft: '15px' }} 
                    name='pincode'
                    value={serviceData.pincode}
                    onChange={handleChange}
                />
            </div>
            <div className='input-info'>
                <label>Tell a brief info about you:</label>
                <Input style={{ width: '100%', marginTop: '10px' }} 
                    name='serviceAbout'
                    value={serviceData.serviceAbout}
                    onChange={handleChange}
                />
            </div>
        </div> 
    )
}

export default BasicInfo