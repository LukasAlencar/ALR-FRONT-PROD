import React from 'react'
import SectionPattern from '../../SectionPattern'
import Logo from '../../../img/logo.png'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <div className="bg"></div>
            <div className='flex-1 d-flex justify-content-center align-items-center'>
                <div className='d-flex justify-content-center align-items-center' style={{ height: '50%', width: '100%' }}>
                    <div className="section-page-cp">
                        <div style={{flex:0}} className='logo-cp flex-0'>
                            <Link to="/home">
                                <span className="a-logo"><img className='img-logo' src={Logo} alt="Home" /><div className="logoName">ALR</div></span>
                            </Link>
                        </div>
                        <div style={{ flex: 1 }} className="d-flex justify-content-center align-items-center">
                            <h1 style={{fontSize:24, marginTop: -30, fontWeight: 'bold'}} className='font-tertiary text-center'>404 - NOT FOUND</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound