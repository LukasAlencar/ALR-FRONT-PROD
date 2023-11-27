import React, { useContext, useEffect, useState } from 'react'
import '../styles/components/section.sass'
import ListLicenses from './ListLicenses'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/AuthContext'

const Section = () => {

    const { actualUser } = useContext(Context)
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [list, setList] = useState([])

    async function getApi() {
        setIsLoading(true)
        await axios.get(`https://api.alrtcc.com/contracts/${actualUser.enterprise}/`)
            .then(res => {
                setList(res.data)
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        getApi()
    }, [])

    if (isLoading) {
        return (<>
            <div className='mask' />
            <CircularProgress className='progress-rol' />
        </>)
    } else {

        return (
            <>
                <div className='section-container'>
                    <div className="section-list">
                        {list.length > 0 ?
                            <>
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
                                <div >
                                    <ListLicenses datas={list} />
                                </div>

                            </>
                            :
                            <div className='text-center'>
                                You don't have any license. <span style={{color: 'blue'}} onClick={()=>navigate('/create-contract')} className='link'>Create Now!</span>
                            </div>
                    }
                    </div>
                </div>
            </>
        )
    }
}

export default Section