import React, { useContext, useEffect, useState, useRef } from 'react'
import '../styles/components/section.sass'
import ListLicenses from './ListLicenses'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/AuthContext'
import { useReactToPrint } from "react-to-print";
import { FaRegFilePdf } from 'react-icons/fa6';

// TODO: Change language to pt-br
// TODO: Remove unused functions / constants
// TODO: Remove console.log

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
                    <div style={{ display: 'none' }}>
                        <div
                            ref={componentPDF}
                            className="section-list"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: '20px',
                                border: '1px solid #000',
                            }}
                        >
                            <div className="section-list">
                                {list.length > 0 ?
                                    <>
                                        <div className="header-section">
                                            <ul className='ul-header-section'>
                                                <div className="row text-align-center width-100 font-tertiary">
                                                    <div className="col-sm">
                                                        Chave Serial
                                                    </div>
                                                    <div className="col-sm">
                                                        Número da Invoice
                                                    </div>
                                                    <div className="col-sm">
                                                        Produto
                                                    </div>
                                                    <div className="col-sm">
                                                        Data de ativação
                                                    </div>
                                                    <div className="col-sm">
                                                        Data de Expiração
                                                    </div>
                                                </div>
                                            </ul>
                                        </div>
                                        <div className='divider'></div>
                                        <div >
                                            <ListLicenses datas={list} />
                                        </div>

                                    </>
                                    :
                                    <>
                                        <div className='text-center font-tertiary'>
                                            Você não possui nenhuma licença. <span style={{ color: 'blue', fontSize: 15 }} onClick={() => navigate('/create-contract')} className='link'>Criar licença!</span>
                                        </div>
                                        <div className='divider'></div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="section-list">
                        {list.length > 0 ?
                            <>
                                <div className="header-section">
                                    <ul className='ul-header-section'>
                                        <div className="row text-align-center width-100 font-tertiary">
                                            <div className="col-sm">
                                                Chave Serial
                                            </div>
                                            <div className="col-sm">
                                                Número da Invoice
                                            </div>
                                            <div className="col-sm">
                                                Produto
                                            </div>
                                            <div className="col-sm">
                                                Data de ativação
                                            </div>
                                            <div className="col-sm">
                                                Data de Expiração
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                                <div className='divider'></div>
                                <div >
                                    <ListLicenses datas={list} />
                                </div>

                            </>
                            :
                            <>
                                <div className='text-center font-tertiary'>
                                    Você não possui nenhuma licença. <span style={{ color: 'blue', fontSize: 15 }} onClick={() => navigate('/create-contract')} className='link'>Criar licença!</span>
                                </div>
                                <div className='divider'></div>
                            </>
                        }
                    </div>
                </div >
                {list.length > 0 && <button className='pdf-button' onClick={generatePDF}><FaRegFilePdf /></button>}

            </>
        )
    }
}

export default Section