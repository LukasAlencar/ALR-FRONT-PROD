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

import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { LiaFileContractSolid } from 'react-icons/lia'
import TrashIcon from './TrashIcon'
import axios from 'axios';

import { LiaClockSolid } from 'react-icons/lia'
import { AiOutlineCheck } from 'react-icons/ai'

import CircularProgress from '@mui/material/CircularProgress';
import RowCustom from './RowCustom';
import ModalPattern from './ModalPattern';
import { Context } from '../context/AuthContext';


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

    const { actualUser } = useContext(Context)
    const [isLoading, setIsLoading] = useState(false)
    const [loadingProducts, setLoadingProducts] = useState(true)
    const [products, setProducts] = useState([])

    const [licensesList, setLicensesList] = useState(
        [{
            name: 'default',
            file: "",
            cost_center: "",
            status: true,
            start_date: "",
            end_date: "",
            invoice_number: "",
            serial_key: "",
        }]
    )
    const [modal, setModal] = useState({
        isShow: false,
        textTitle: '',
        textBody: '',
    })

    async function getApi() {
        debugger;
        setIsLoading(true)
        axios.get(`https://api.alrtcc.com/contracts/${actualUser.enterprise}`)
            .then(res => {
                setLicensesList(res.data)
            })
            .catch(err => {
                if (err?.response?.data?.message == "Nenhum contrato encontrado") {
                    setLicensesList([])
                }
            })
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        getApi();
        (async () => {
            await axios.get('https://api.alrtcc.com/products/').then(res => {
                setProducts(res.data)
            })
                .catch(err => console.log(err))
                .finally(() => {
                    setLoadingProducts(false)
                })
        })()
    }, [])

    const handleAddLicense = async () => {

        if (listAdd.product && listAdd.activateDate && listAdd.expirationDate && listAdd.product && listAdd.product != 'default') {
            if (listAdd.activateDate > listAdd.expirationDate) {
                setModal((prev) => ({ ...prev, isShow: true, textTitle: <span className='error'>Error!</span>, textBody: <>The <span style={{ fontWeight: 'bold' }}>Activate Date</span> cannot be later than the <span style={{ fontWeight: 'bold' }}>Expirate Date.</span></> }))
                return false
            }
            setIsLoading(true);
            const formData = new FormData()
            formData.append('name', listAdd.product)
            formData.append('file', listAdd.contract)
            formData.append('status', listAdd.status)
            formData.append('start_date', listAdd.activateDate)
            formData.append('end_date', listAdd.expirationDate)
            formData.append('invoice_number', listAdd.invoice_number)
            formData.append('serial_key', listAdd.serial_key)
            formData.append('enterprise', actualUser.enterprise)

            await axiosInstance.post('https://api.alrtcc.com/register-contract/', formData)
                .then(() => {
                    setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Success!', textBody: 'Contract added successfully!' }))
                })
                .catch(() => setModal((prev) => ({ ...prev, isShow: true, textTitle: <span className='error'>Error!</span>, textBody: 'Contract not added!' })))
                .finally(() => {
                    setIsLoading(false);
                })
            getApi()
            return;
        } else {
            setModal((prev) => ({ ...prev, isShow: true, textTitle: <span className='error'>Error!</span>, textBody: 'Fields Empty!' }))
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
            invoice_number: '',
            serial_key: '',
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
            .then(() => setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Success!', textBody: 'Contract removed successfully!' })))
            .catch(() => setModal((prev) => ({ ...prev, isShow: true, textTitle: <span className='error'>Error!</span>, textBody: 'Contract not removed!' })))
            .finally(() => {
                setIsLoading(false);
                getApi();
            })

    }

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
                            <TableCell align="center">Invoice Number</TableCell>
                            <TableCell align="center">Serial Key</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell className='d-flex align-items-center' align="center">
                                <label title={listAdd?.contract?.name ? listAdd.contract.name : 'Choose a file'} className='labelInputContract' htmlFor="fileContract">{listAdd?.contract?.name ? listAdd.contract.name : 'Choose a file'}</label>
                                <input onChange={handleFileChange} id="fileContract" type="file" accept='application/pdf' className='inputFileContract' />
                            </TableCell>
                            <TableCell>
                                <select style={{width: 150}} value={listAdd.product} onChange={handleChange} name='product' className='form-select text-center' >
                                    <option value="default">Select Product</option>
                                    {loadingProducts && <option disabled value="default">Loading...</option>}

                                    {products?.map((product) => {
                                        return <option key={product.id} value={product.name}>{product.name}</option>
                                    })}
                                </select>
                            </TableCell>
                            <TableCell align="center"><input onChange={handleChange} value={listAdd.activateDate} name='activateDate' className='form-control text-center' type="date" /></TableCell>
                            <TableCell align="center"><input onChange={handleChange} value={listAdd.expirationDate} name='expirationDate' className='form-control text-center' type="date" /></TableCell>
                            <TableCell align="center"><input onChange={handleChange} value={listAdd.invoice_number} name='invoice_number' className='form-control text-center' type="text" /></TableCell>
                            <TableCell align="center"><input onChange={handleChange} value={listAdd.serial_key} name='serial_key' className='form-control text-center' type="text" /></TableCell>
                            <TableCell align="center"><button onClick={handleAddLicense} style={{ width: 100 }} className='btn btn-primary'>Add +</button></TableCell>


                        </TableRow>
                        {licensesList?.slice().reverse()?.map((license) => {
                            return (
                                <>
                                    {(products.length != 0 && license.name != 'default') &&
                                        <RowCustom products={products} setIsLoading={setIsLoading} setLicensesList={setLicensesList} handleRemoveLicense={(e) => { handleRemoveLicense(e) }} datas={license} />
                                    }
                                </>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>


        </>
    )
}

export default GridComponent
