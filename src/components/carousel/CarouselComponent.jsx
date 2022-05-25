import { Carousel } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css'
import FirstPic from '../../images/teacher-back.png'
import SecondPic from '../../images/cleaning-slide.jpg'
import ThirdPic from '../../images/ac-slide.jpg'

const CarouselComponent = () => {
    return (
        <Carousel style={{ position: 'absolute', width: '100%', zIndex: '-1' }} prevIcon={null} nextIcon={null}>
            <Carousel.Item interval={1000}>
                <img
                    style={{height: '650px'}}
                    className="d-block w-100"
                    src={FirstPic}
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={500}>
                <img
                    style={{height: '650px'}}
                    className="d-block w-100"
                    src={SecondPic}
                    alt="Second slide"
                />
      
            </Carousel.Item>
            <Carousel.Item>
                <img
                    style={{height: '650px'}}
                    className="d-block w-100"
                    src={ThirdPic}
                    alt="Third slide"
                />
            </Carousel.Item>
      </Carousel>
    )
}

export default CarouselComponent