import React, { useContext, useEffect, useState, useRef } from 'react'
import '../styles/components/section.sass'
import ListLicenses from './ListLicenses'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/AuthContext'
import { useReactToPrint } from "react-to-print";
import { FaRegFilePdf } from 'react-icons/fa6';


const Section = () => {

    const componentPDF = useRef();

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

    const generatePDF = useReactToPrint(
        {
            content: () => componentPDF.current,
            documentTitle: 'Report',
            onAfterPrint: () => alert("Data saved successfully")
        }
    );


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
                    <div ref={componentPDF} className="section-list">
                        {list.length > 0 ?
                            <>
                                <div className="header-section">
                                    <ul className='ul-header-section'>
                                        <div className="row text-align-center width-100 font-tertiary">
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
                            <div className='text-center font-tertiary'>
                                You don't have any license. <span style={{ color: 'blue' }} onClick={() => navigate('/create-contract')} className='link'>Create Now!</span>
                            </div>
                        }
                    </div>
                </div>
                {list.length > 0 && <button className='pdf-button' onClick={generatePDF}><FaRegFilePdf /></button> }

            </>
        )
    }
}

export default Section