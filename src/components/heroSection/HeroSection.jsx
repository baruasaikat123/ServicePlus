import { Link } from 'react-router-dom'
import './heroSection.css'
import HeroSectionPic from '../../images/hero_setion_pic.svg'
import { ButtonN } from '../../style'
import { useDispatch } from 'react-redux'
import { setModal } from '../../redux/actions/modalAction'
import { BsArrowRight } from 'react-icons/bs'
import { HERO_SECTION_HEADING } from '../../constants'

const HeroSection = () => {

  const dispatch = useDispatch()

  return (
    <div className='hero-section-container'>
      <div className='hero-section-text'>
        <h1>{HERO_SECTION_HEADING}</h1>
        <h2>All Over <span>India</span></h2>
        <ButtonN onClick={() => dispatch(setModal(true))} className='hero-section-text-btn'>Free SignUp Now &nbsp;
          <BsArrowRight />
        </ButtonN>
      </div>
      <div className='hero-section-pic'>
        <img src={HeroSectionPic} alt={'pic'} />
        <Link to='/services/category'>
          <ButtonN className='hero-section-btn'>Search Services</ButtonN>
        </Link>
      </div>
    </div>
  )
}

export default HeroSection