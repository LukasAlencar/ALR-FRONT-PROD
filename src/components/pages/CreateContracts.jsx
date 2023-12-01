import React from 'react'

// Components

import Navbar from '../Navbar'

// Libraries

import { useState } from 'react'

// Styles

import '../../styles/components/page-create-contract.sass'
import GridComponent from '../Grid'
import ModalALR from '../ModalALR'
import LeftMenu from '../LeftMenu'

const CreateContracts = () => {

    const [licensesList, setLicenseList] = useState([])
    const [modal, setModal] = useState(false)

    const handleRemoveLicense = (uuid) => {
        setLicenseList(prev => prev.filter(license => license.uuid !== uuid))
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