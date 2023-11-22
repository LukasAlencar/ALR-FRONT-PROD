import React, { useState } from 'react'
import Lottie from 'react-lottie'
import animationData from '../assets/animations/loader.json'

const Loader = () => {

    const [animationState, setAnimationState] = useState({
        isStopped: false, isPaused: false
    })

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }
  return (
    <>
    <Lottie options={defaultOptions}
            style={{pointerEvents: 'none'}}
            height={50}
            width={50}
            speed={1}
            isStopped={animationState.isStopped}
            isPaused={animationState.isPaused}
            isClickToPauseDisabled/>
            </>
  )
}

export default Loader