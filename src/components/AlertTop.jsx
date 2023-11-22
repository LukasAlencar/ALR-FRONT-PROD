import React, { useState } from 'react'
import '../styles/components/alert.sass'
import {CiWarning} from 'react-icons/ci'
import {AiOutlineClose} from 'react-icons/ai'
const AlertTop = ({text, active, handleAlert}) => {
    const [isVisible, setIsVisible] = useState(active)
    
        return (
            <div className='alert'><CiWarning style={{fontSize: 30, marginRight: 20}}/>{text}<span onClick={handleAlert} className='close'><AiOutlineClose/></span></div>
        )
    
}

export default AlertTop