import React from 'react'
import WorkInfo from '../components/workInfo/WorkInfo'
import './about.css'
import * as RegisterAnimation from '../lottie/register.json'
import * as SearchAnimation from '../lottie/search.json'

const About = () => {

  const items = [
    {
      animation: RegisterAnimation,
      heading: '1. Register & Complete Profile',
      description: 'Free signup with a valid Email ID or Mobile No. Complete or Update your profile before visible to public.'
    },
    {
      animation: SearchAnimation,
      heading: '2. Search Services',
      description: 'Search services according to location.'
    },
    {
      animation: SearchAnimation,
      heading: '2. Search Services',
      description: 'Search services according to location.'
    },

  ]
  return (
    <>
      <div className='about-heading-container'>
        <h1>How does it work ?</h1>
      </div>
      <div className='about-info-container'>
        {items.map((item, key) => (
          <WorkInfo key={key} item={item} />
        ))}
      </div>
    </>
  )
}

export default About