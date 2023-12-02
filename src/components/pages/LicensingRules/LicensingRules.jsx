import React, { useEffect, useState } from 'react'
import Navbar from '../../Navbar'
import LeftMenu from '../../LeftMenu'
import GridPattern from '../../GridPattern'
import axios from 'axios'
import ModalPattern from '../../ModalPattern'
import CircularProgress from '@mui/material/CircularProgress';

// TODO: Change language to pt-br

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
                    let dados = res.data

                    const dadosModificados = dados.map(obj => ({
                        id: obj.id,
                        Título: obj.title,
                        Arquivo: obj.file,
                        manufacturer: obj.manufacturer,
                    }));

                    setListBodyItems(dadosModificados)
                })
                .catch(() =>
                    setModal((prev) => ({ ...prev, isShow: true, textTitle: <span className='error'>Ocorreu um erro!</span>, textBody: <>Não foi possível carregar as regras de licenciamento, tente novamente mais tarde!</> }))
                )
                .finally(() => {
                    setIsLoading(false)
                })
        })()

    }, [])

    const downloadFile = (file) => {
        const a = document.createElement('a');
        a.href = file;
        a.target = '_blank';
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(file);
    }

    const listHeaderItems = [
        { itemName: 'Título', align: 'center', fileField: { is: false, accept: '' }, editField: { is: false }, },
        { itemName: 'Arquivo', align: 'center', fileField: { is: false, accept: '' }, editField: { is: false }, downloadIcon: true, downloadFunction: () => { downloadFile } },
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
                <div className="bg"></div>
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
                <div className="main-section overflow-hidden d-flex justify-content-center align-items-center">
                    <div className='section-grid-table'>
                        <GridPattern
                            downloadFunction={downloadFile}
                            listHeaderItems={listHeaderItems}
                            listBodyItems={listBodyItems}
                            canEdit={false}
                        />
                    </div>
                </div>
            </>
        )
    }
}

export default LicensingRules