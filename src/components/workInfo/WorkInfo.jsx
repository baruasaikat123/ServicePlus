import './workInfo.css'
import Lottie from 'lottie-react'
import { useEffect } from 'react'
//import * as RegisterAnimation from '../../lottie/register.json'

const WorkInfo = ({ item }) => {
  

  return (
    <div className='work-info-container'>
      <div>
        <Lottie 
          animationData={item.animation}
          loop={true}
          autoPlay={true}
          style={{height: '200px'}}
        />
      </div>
      <div className='work-info-heading'>
        <h3>{item.heading}</h3>
        <p>{item.description}</p>
      </div>
    </div>
  )
}

export default WorkInfo