import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar'
import LeftMenu from '../../LeftMenu'
import GridPattern from '../../GridPattern'
import axios from 'axios'
import ModalPattern from '../../ModalPattern'
import CircularProgress from '@mui/material/CircularProgress';
import { LiaFileContractSolid } from 'react-icons/lia'


const LicensingRules = () => {

    const [listBodyItems, setListBodyItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [modal, setModal] = useState({
        isShow: false,
        textTitle: '',
        textBody: '',
    })

    useEffect(() => {
        (async () => {
            await axios.get('https://api.alrtcc.com/documents/')
                .then(res => {
                    setListBodyItems(res.data)
                    console.log(res.data)
                })
                .catch(() =>
                    setModal((prev) => ({ ...prev, isShow: true, textTitle: <span className='error'>Error!</span>, textBody: <>Failed To Loading Licensing Rules, try again later</> }))
                )
                .finally(() => {
                    setIsLoading(false)
                })
        })()

    },[])

    const downloadFile = (file) =>{
        const a = document.createElement('a');
        a.href = file;
        a.target = '_blank';
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(file);
    }

    const listHeaderItems = [
        { itemName: 'title', align: 'center', fileField: { is: false, accept: '' }, editField: { is: false }, },
        { itemName: 'file', align: 'center', fileField: { is: false, accept: '' }, editField: { is: false }, downloadIcon: true, downloadFunction: () => {downloadFile}},
    ]

    if (isLoading) {
        return (
            <>
                <div className='mask' />
                <CircularProgress className='progress-rol' />
            </>
        )
    } else {

        return (
            <>
                <ModalPattern
                    toggleModal={() => setModal((prev) => ({ ...prev, isShow: false }))}
                    open={modal.isShow}
                    textTitle={modal.textTitle}
                    textBody={modal.textBody}
                    textBtn1={'Ok'}
                    handleClick1={() => setModal((prev) => ({ ...prev, isShow: false }))}
                />
                <Navbar />
                <LeftMenu />
                <div className="main-section">
                    <GridPattern
                        downloadFunction={downloadFile}
                        listHeaderItems={listHeaderItems}
                        listBodyItems={listBodyItems}
                        canEdit={false}
                    />
                </div>
            </>
        )
    }
}

export default LicensingRules