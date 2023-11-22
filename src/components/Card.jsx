import {SiMicrosoft} from 'react-icons/si'
import {SiAdobe} from 'react-icons/si'
import {GrVmware} from 'react-icons/gr'
import {HiOutlineCalculator} from 'react-icons/hi'
import GraphBar from './GraphBar'
import Calculator from './Calculator'
import { useState } from 'react'

import '../styles/components/card.sass'


const Card =({cardName})=>{
    function icon(){
        if(cardName == 'Microsoft'){
            return <SiMicrosoft className='icon'/>
        }else if(cardName == 'Adobe'){
            return <SiAdobe className='icon'/>
        }else if(cardName == 'VMware'){
            return <GrVmware className='icon'/>
        }else if(cardName == 'calculator'){
            return <HiOutlineCalculator className='icon'/>
        }
    }
    function content(){
        if(cardName == 'Microsoft'){
            return(
                <>  
                    <GraphBar programName={"Windows"}/>
                    <GraphBar programName={"Office"}/>
                </>
            )
        }else if(cardName == 'Adobe'){
            return(
                <>
                    <GraphBar programName={"PhotoShop"}/>
                    <GraphBar programName={"AfterEffects"}/>
                </>
            )
        }else if(cardName == 'VMware'){
            return(
                <>
                </>
            )
        }else if(cardName == 'calculator'){
            return(
                <>
                    <Calculator />
                </>
            )
        }
    }
    return(
    <>

        <div className="col-sm-4 c-card d-flex wrap-in justify-content-center ">
        <div className="cardName">
            {cardName} {icon()}
            
        </div>
            <div className="card">
            <div className="card-body">
                {content()}
            </div>
            </div>
        </div>
    </>
)
}

export default Card