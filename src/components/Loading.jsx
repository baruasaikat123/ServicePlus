import * as Loader from '../lottie/circle-loading.json'
import Lottie from 'lottie-react'

const Loading = () => {

    return (
        <>
            <Lottie
                animationData={Loader}
                loop={true}
                autoPlay={true}
                style={{height: '150px'}}
            />
        </>
    )
}

export default Loading