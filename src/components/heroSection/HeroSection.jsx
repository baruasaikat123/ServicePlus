import { Link } from 'react-router-dom'
import './heroSection.css'
import HeroSectionPic from '../../images/hero_setion_pic.svg'
import { ButtonN } from '../../style'
import { BsArrowRight } from 'react-icons/bs'
import { HERO_SECTION_HEADING } from '../../constants'
import CarouselComponent from '../carousel/CarouselComponent'


const HeroSection = () => {


  return (
    <>
      <CarouselComponent />
      <div className='hero-section-container'>
        <div style={{margin: '55px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '50px'}}>
          <h1>Turn your skills into profession by registering with us</h1>
          <h4 style={{color: 'gold'}}>Register your services here</h4>
          <h5 style={{ color: 'red', fontSize: '18px', marginTop: '25px' }}>We help both service provider & service require people to connect each other based on their requirements.</h5>
          <ButtonN style={{marginTop: '25px', width: '250px', background: 'var(--app-blue)', color: '#fff'}}>Get Started</ButtonN>
        </div>
      </div>
    </>
      
  )
}

export default HeroSection