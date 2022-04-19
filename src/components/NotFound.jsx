import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'
import * as NotFoundAnimation from '../lottie/404-page.json'

const NotFound = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems:'center'}}>
            <Lottie 
                animationData={NotFoundAnimation}
                loop={true}
                autoPlay={true}
                style={{height: '200px'}}
            />
            <Link to="/">Back to Home</Link>
        </div>
    )
}

export default NotFound