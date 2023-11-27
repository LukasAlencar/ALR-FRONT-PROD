import React, { useEffect } from 'react'

// Components

import Navbar from '../Navbar'
import TrashIcon from '../TrashIcon'


// Libraries

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { v4 as uuidv4 } from 'uuid';


// Icons

import { AiOutlinePlus } from 'react-icons/ai'

// Styles

import '../../styles/components/page-create-contract.sass'
import axios from 'axios';
import GridComponent from '../Grid'
import Footer from '../Footer'
import ModalALR from '../ModalALR'
import LeftMenu from '../LeftMenu'



const CreateContracts = () => {

    const [licensesList, setLicenseList] = useState([])
    const [licenseName, setlicenseName] = useState('default')
    const [activeDate, setActiveDate] = useState('')
    const [expirationDate, setExpirationDate] = useState('')
    const [contract, setContract] = useState(undefined)
    const [licenseSelectList, setLicenseSelectList] = useState([])
    const [isAlert, setIsAlert] = useState(false)
    const [modal, setModal] = useState(false)


    const handleAddLicense = () => {

        if (licenseName && activeDate && contract) {
            setLicenseList(prev => {
                let newArray = [...prev, {
                    licenseName,
                    activeDate,
                    expirationDate,
                    contract,
                    uuid: uuidv4()
                }]
                return newArray
            })
            setlicenseName('default')
        } else {
            setIsAlert(true)
        }


    }

    const handleRemoveLicense = (uuid) => {
        setLicenseList(prev => prev.filter(license => license.uuid !== uuid))
    }

    const handleContract = (e) => {
        let file = e.target.files[0]
        setContract(file)
    }

    const handleAlert = () => {
        setIsAlert(false)
    }

    const handleToggleModal = () => {
        setModal(!modal)
    }

    const handleDiscard = () => {
        if (licensesList) {
            setLicenseList([])
        }
        handleToggleModal()
    }


    return (
        <>
            <div className='bg'></div>
            <Navbar />
            <div className='d-flex flex-1'>
                <ModalALR handleDiscard={() => handleDiscard()} open={modal} toggleModal={() => handleToggleModal()} />
                <LeftMenu />
                <div style={{ marginTop: '8vh', marginLeft: '15vw' }} className='section-list-contracts'>
                    <GridComponent handleRemoveLicense={(e) => handleRemoveLicense(e)} list={licensesList} />
                </div>
            </div>

        </>
    )
}

export default CreateContracts