import React from 'react'
import Navbar from '../Navbar'
import LeftMenu from '../LeftMenu'
import '../../styles/components/view-enterprise.css'
import Image from '../../img/Jackchan.png'
const ViewEnterprise = () => {
    return (
        <>
            <Navbar />
            <div className="d-flex flex-1">
                <LeftMenu />
                <div style={{ marginTop: '8vh', marginLeft: '15vw' }}>
                    <div className="container d-flex justify-content-center align-items-around">
                        <div className="container d-flex flex-column justify-content-around">
                            <div className="row mt-5 flex-row-reverse">
                                <div className="col-lg-6 d-flex ">
                                    <div className="about-text go-to d-flex justify-content-around flex-column">
                                        <div>
                                            <h3 className="dark-color">About We</h3>
                                            <h6 className="theme-color lead">We are a company focused on the fight industry</h6>
                                            <p>Our priority is the advertising and marketing of the main fight-related events</p>
                                        </div>
                                        <div>
                                            <div className="row about-list">
                                                <div className="col-md-6">
                                                    <div className="media">
                                                        <label>Birthday</label>
                                                        <p>4th april 2003</p>
                                                    </div>
                                                    <div className="media">
                                                        <label>Age</label>
                                                        <p>20 Yr</p>
                                                    </div>
                                                    <div className="media">
                                                        <label>Team</label>
                                                        <p>4</p>
                                                    </div>
                                                    <div className="media">
                                                        <label>Address</label>
                                                        <p>California, USA</p>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="media">
                                                        <label>E-mail</label>
                                                        <p>info@domain.com</p>
                                                    </div>
                                                    <div className="media">
                                                        <label>Phone</label>
                                                        <p>820-885-3321</p>
                                                    </div>
                                                    <div className="media">
                                                        <label>Linkedin</label>
                                                        <p>jkcEnterprise</p>
                                                    </div>
                                                    <div className="media">
                                                        <label>Industry</label>
                                                        <p>Fight</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="about-avatar">
                                        <img src={Image} title="" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="counter">
                                <div className="row">
                                    <div className="col-6 col-lg-3">
                                        <div className="count-data text-center">
                                            <h6 className="count h2" data-to="500" data-speed="500">14</h6>
                                            <p className="m-0px font-w-600">Active Licenses</p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        <div className="count-data text-center">
                                            <h6 className="count h2" data-to="150" data-speed="150">3</h6>
                                            <p className="m-0px font-w-600">Expiring Licenses</p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        <div className="count-data text-center">
                                            <h6 className="count h2" data-to="850" data-speed="850">1</h6>
                                            <p className="m-0px font-w-600">Expired Licenses</p>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        <div className="count-data text-center">
                                            <h6 className="count h2" data-to="190" data-speed="190">86%</h6>
                                            <p className="m-0px font-w-600">Rating</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewEnterprise