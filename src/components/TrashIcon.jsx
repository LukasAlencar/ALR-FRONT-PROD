import React, { useState } from 'react'
import Lottie from 'react-lottie';
import animationData from '../assets/animations/trash.json'


const TrashIcon = ({handleClick, uuid, mt}) => {
    // ANIMATION //

    const [animationState, setAnimationState] = useState({
        isStopped: true, isPaused: false, direction: -1
    })

    const defaultOptions = {
        loop: false,
        autoplay: false, 
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return (
        <div title="Remove" id={uuid} onMouseEnter={() => setAnimationState({...animationState, isStopped: false})}
        onMouseOut={()=> setAnimationState({...animationState, isStopped: true, direction: -1})}
        onClick={(e)=> handleClick(e.target.id)}
        style={{cursor: 'pointer', marginTop: mt, marginLeft: 5}}
            >
                <Lottie options={defaultOptions}
                    style={{pointerEvents: 'none'}}
                    height={20}
                    width={20}
                    speed={2}
                    isStopped={animationState.isStopped}
                    isPaused={animationState.isPaused}
                    isClickToPauseDisabled
                    
                    />
    </div>   

  )
}

export default TrashIcon