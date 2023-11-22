import React, { useEffect, useState } from 'react'
import '../styles/components/section.sass'
import ListLicenses from './ListLicenses'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';

const Section = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [list, setList] = useState([])

    async function getApi() {
        setIsLoading(true)
        await axios.get('https://api.alrtcc.com/contracts/')
            .then(res => {
                setList(res.data)
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        getApi()

    }, [])

    if(isLoading){
        return (<>
            <div className='mask' />
            <CircularProgress className='progress-rol' />
        </>)
    }else{

    return (
        <>
            <div className='section-container'>
                <div className="section-list">
                    <div className="header-section">
                        <ul className='ul-header-section'>
                            <div className="row text-align-center width-100">
                                <div className="col-sm">
                                    Id
                                </div>
                                <div className="col-sm">
                                    Name
                                </div>
                                <div className="col-sm">
                                    Start Date
                                </div>
                                <div className="col-sm">
                                    End Date
                                </div>
                            </div>
                        </ul>
                    </div>
                    <div className="main-section">
                        <ListLicenses datas={list} />
                    </div>
                </div>
            </div>
        </>
    )
    }
}

export default Section