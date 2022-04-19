import Dropdown from './Dropdown'
import {
  Heading,
  FormInput,
  FormContainer,
  FormContent,
  FormButtonN,
  RightArrowIcon,
  ErrorText
} from './formStyle'


import axios from 'axios'
import { useEffect, useState } from 'react'
import { genderOptions } from '../../constants'
import { state, city } from '../../apis/location'
import { FormButtonContainer } from '../../pages/UserDetails/userDeatail'

const BasicInfo = ({ userData, setUserData, handleChange, step, setStep }) => {

  const headers = {
    'X-CSCAPI-KEY': 'OHA4MXJnWEJQalBFRkIzVkNoUjV2VWxtZ2dOYkJwR082Ym44N20ySA=='
  }

  const [stateDetail, setStateDetail] = useState([])
  const [stateNames, setStateNames] = useState([])
  const [cityNames, setCityNames] = useState([])
  const [nameError, setNameError] = useState(false)
  const [ageError, setAgeError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [stateError, setStateError] = useState(false)
  const [cityError, setCityError] = useState(false)
  
  const fetchState = async () => {
    try {
      const {data} = await axios.get(state(), {
        headers: headers
      })

      setStateDetail(data)

      data.map((state) =>
        stateNames.push(state.name)
      )

    } catch (e) {
      console.log(e)
    }
  }
  

  const fetchCity = async (code) => {

    try {
  
      const { data } = await axios.get(city(code), {
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
    fetchState()
  }, [])

  useEffect(() => {
    setUserData({ ...userData, city: '' })
    cityNames.length = 0
    for (let i = 0; i < stateDetail.length; i++){
      if (stateDetail[i].name === userData.state) {
        fetchCity(stateDetail[i].iso2)
        break
      }
    }
    
  }, [userData.state])

  const validateInputs = () => {

    let check = 0

    if (!userData.firstname) {
      setNameError(true)
      check++
    }

    if (!userData.gender) {
      setAgeError(true)
      check++
    }
    
    if (!userData.address) {
      setAddressError(true)
      check++
    }
    
    if (!userData.state) {
      setStateError(true)
      check++
    }
    
    if (!userData.city) {
      setCityError(true)
      check++
    }

    if (check > 0) {
      return false
    }

    return true
    
  }


  const handleNext = (e) => {
    e.preventDefault()
    setStep(step+1)
    
  }

  const checkInputs = () => {
    if (userData.firstname) setNameError(false)
    if (userData.gender) setAgeError(false)
    if(userData.state) setStateError(false)
  }


  

  return (

    <form>
      <FormContainer>
          <Heading>Enter your name & gender:</Heading>
        <FormContent>
          <div>
            <FormInput
                type="text"
                name="firstname"
                placeholder='Enter your first name *' 
                value={userData.firstname}
                onChange={handleChange}
                onBlur={checkInputs}
               
              />
            <ErrorText>{ nameError && 'Required field'}</ErrorText>
          </div>
            <FormInput
              type="text"
              name="lastname"
              value={userData.lastname}
              onChange={handleChange}
              placeholder='Enter your last name' />
            <div>
            <Dropdown
                text={'gender'}
                h={'148px'}
                w={'200px'}
                options = {genderOptions}
                userData={userData}
                data={userData.gender}
                onBlur={checkInputs}
                setUserData={setUserData}
              />
              <ErrorText>{ ageError && 'Required field'}</ErrorText>
            </div>
          </FormContent>
          <Heading style={{marginTop: '45px'}}>Enter your location deatils:</Heading>
          <FormContent>
            <FormInput
              type="text"
              name="address"
              placeholder='Enter your address *' 
              value={userData.address}
              onChange={handleChange}
              />
            <Dropdown
              text={'state'}
              options={stateNames}
              h={'180px'}
              w={'300px'}
              userData={userData}
              data={userData.state}
              onBlur={checkInputs}
              setUserData={setUserData} />
            <ErrorText>{ stateError && 'Required field'}</ErrorText>
            <Dropdown
              text={'city'}
              h={'180px'}
              w={'300px'}
              options={cityNames}
              userData={userData}
              data={userData.city}
              setUserData={setUserData} />
        </FormContent>
        <FormButtonContainer>
          <FormButtonN
            onClick={ handleNext }
             >
              Save & Continue
              <RightArrowIcon />
          </FormButtonN>
        </FormButtonContainer>
      </FormContainer>
    </form>
  )
}

export default BasicInfo