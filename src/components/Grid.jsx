import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

// COMPONENTS { Table }

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { LiaFileContractSolid } from 'react-icons/lia'
import TrashIcon from './TrashIcon'
import axios from 'axios';

import { LiaClockSolid } from 'react-icons/lia'
import { AiOutlineCheck } from 'react-icons/ai'

import CircularProgress from '@mui/material/CircularProgress';
import RowCustom from './RowCustom';
import ModalPattern from './ModalPattern';

const downloadContract = (file) => {
    const a = document.createElement('a');
    a.href = file;
    a.target = '_blank';
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(file);
}

const GridComponent = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [licensesList, setLicensesList] = useState(
        [{
            name: 'default',
            file: "",
            cost_center: "",
            status: true,
            start_date: "",
            end_date: ""
        }]
    )
    const [modal, setModal] = useState({
        isShow: false,
        textTitle: '',
        textBody: '',
    })

    async function getApi() {
        setIsLoading(true)
        axios.get('https://api.alrtcc.com/contracts?enterprise_id=6/')
            .then(res => {
                setLicensesList(res.data)
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        getApi();
    }, [])

    const handleAddLicense = async () => {
        setIsLoading(true);

        if (listAdd.product && listAdd.activateDate && listAdd.expirationDate && listAdd.product) {
            const formData = new FormData()
            formData.append('name', listAdd.product)
            formData.append('file', listAdd.contract)
            formData.append('status', listAdd.status)
            formData.append('start_date', listAdd.activateDate)
            formData.append('end_date', listAdd.expirationDate)
            formData.append('enterprise', 6)


            await axiosInstance.post('https://api.alrtcc.com/register-contract/', formData)
                .then(() => {
                    setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Success!', textBody: 'Contract added successfully!' }))
                })
                .catch(() => setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Error!', textBody: 'Contract not added!' })))
                .finally(() => {
                    setIsLoading(false);
                })
            getApi()
            return;
        }else{
            setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Error!', textBody: 'Fields Empty!' }))
        }
        setIsLoading(false);
    }

    const handleChange = (e) => {
        let { value, name } = e.target

        setListAdd((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setListAdd(prev => ({ ...prev, contract: file }))
    }

    const [listAdd, setListAdd] = useState(
        {
            product: '',
            contract: '',
            status: 'True',
            activateDate: '',
            expirationDate: '',

        }
    )

    // Função para obter o token CSRF do cookie
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
    }

    const csrftoken = getCookie('csrftoken');

    const axiosInstance = axios.create({
        headers: {
            'X-CSRFToken': csrftoken // Inclua o token CSRF nos cabeçalhos da solicitação
        }
    });

    const handleRemoveLicense = async (uuid) => {
        setIsLoading(true)
        await axios.delete(`https://api.alrtcc.com/contract/${uuid}`)
            .then(()=> setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Success!', textBody: 'Contract removed successfully!' })))
            .catch(() => setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Error!', textBody: 'Contract not removed!'})))
            .finally(() => {
                setIsLoading(false);
            })

        getApi();
    }

    const products = [
        { productName: 'Photoshop 2008' },
        { productName: 'Photoshop 2010' },
        { productName: 'Photoshop 2012' },
        { productName: 'Photoshop 2016' },
        { productName: 'Photoshop 2020' },
        { productName: 'Photoshop CS6' },
        { productName: 'Photoshop CC' },
        { productName: 'VCenter' },
        { productName: 'VSphere' },
        { productName: 'VMware Workstation' },
        { productName: 'Windows 7' },
        { productName: 'Windows 8' },
        { productName: 'Windows 10' },
        { productName: 'Windows 11' },
    ]

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
            {isLoading && <>
                <div className='mask' />
                <CircularProgress className='progress-rol' />
            </>
            }
            <TableContainer className='mt-4' style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Contract</TableCell>
                            <TableCell align="center">Product</TableCell>
                            <TableCell align="center">Activate Date</TableCell>
                            <TableCell align="center">Expirate  Date</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center"><input onChange={handleFileChange} type="file" accept='application/pdf' className='form-control' /></TableCell>
                            <TableCell>
                                <select value={listAdd.product} onChange={handleChange} name='product' className='form-select text-center' >
                                    <option disabled value="default">Select Product</option>
                                    {products?.map((product) => {
                                        return <option value={product.productName}>{product.productName}</option>
                                    })}
                                </select>
                            </TableCell>
                            <TableCell align="center"><input onChange={handleChange} value={listAdd.activateDate} name='activateDate' className='form-control text-center' type="date" /></TableCell>
                            <TableCell align="center"><input onChange={handleChange} value={listAdd.expirationDate} name='expirationDate' className='form-control text-center' type="date" /></TableCell>
                            <TableCell align="center"><button onClick={handleAddLicense} style={{ width: 100 }} className='btn btn-primary'>Add +</button></TableCell>


                        </TableRow>
                        {licensesList?.slice().reverse()?.map((license) => (
                            <RowCustom products={products} setIsLoading={setIsLoading} setLicensesList={setLicensesList} handleRemoveLicense={(e) => { handleRemoveLicense(e) }} datas={license} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </>
    )
}

export default GridComponent
