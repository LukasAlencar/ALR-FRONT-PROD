import { TableCell, TableRow } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { LiaFileContractSolid } from 'react-icons/lia'
import TrashIcon from './TrashIcon'
import axios from 'axios'
import { AiOutlineCheck } from 'react-icons/ai'
import { HiXMark, HiOutlinePencilSquare } from 'react-icons/hi2'
import ModalPattern from './ModalPattern'
import { Context } from '../context/AuthContext'

const RowCustom = ({ datas, handleRemoveLicense, setIsLoading, setLicensesList, products }) => {

    const { actualUser } = useContext(Context)

    const [modal, setModal] = useState({
        isShow: false,
        textTitle: '',
        textBody: '',
    })

    const [isEdit, setIsEdit] = useState(false)
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

    const downloadContract = (file) => {
        const a = document.createElement('a');
        a.href = file;
        a.target = '_blank';
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(file);
    }

    const handleSaveLicense = async () => {
        
        if (listAdd.product && listAdd.activateDate && listAdd.expirationDate && listAdd.product != 'default' && listAdd.invoice_number && listAdd.serial_key) {
            setIsLoading(true);

            if (listAdd.activateDate > listAdd.expirationDate) {
                setModal((prev) => ({ ...prev, isShow: true, textTitle: <span className='error'>Error!</span>, textBody: <>The <span style={{ fontWeight: 'bold' }}>Activate Date</span> cannot be later than the <span style={{ fontWeight: 'bold' }}>Expirate Date.</span></> }))
                return false
            }
            const formData = new FormData()
            formData.append('name', listAdd.product)
            formData.append('status', listAdd.status)
            formData.append('start_date', listAdd.activateDate)
            formData.append('end_date', listAdd.expirationDate)
            formData.append('invoice_number', listAdd.invoice_number)
            formData.append('serial_key', listAdd.serial_key)


            if (listAdd.contract) {
                formData.append('file', listAdd.contract)
            }

            await axios.put(`https://api.alrtcc.com/contract/${datas.id}/`, formData)
                .then(() => {
                    setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Success!', textBody: 'Contract edited successfully!' }))
                    setIsEdit(false)
                })
                .catch(() => setModal((prev) => ({ ...prev, isShow: true, textTitle: <span className='error'>Error!</span>, textBody: 'Contract not edited!' })))
                .finally(() => {
                    setIsLoading(false);
                })

            getApi()
        } else {
            setModal((prev) => ({ ...prev, isShow: true, textTitle: <span className='error'>Cannot edit your license</span>, textBody: 'Empty Fields!' }))
        }
    }

    useEffect(() => {
    }, [])

    async function getApi() {
        setIsLoading(true)

        await axios.get(`https://api.alrtcc.com/contracts/${actualUser.enterprise}`)
            .then(res => {
                setLicensesList(res.data)
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }

    const handleToggleEdit = (val) => {
        setListAdd(
            {
                product: datas.name,
                contract: datas.contract,
                status: 'True',
                activateDate: datas.start_date,
                expirationDate: datas.end_date,
                invoice_number: datas.invoice_number,
                serial_key: datas.serial_key,

            })
        setIsEdit(val)
    }

    if (isEdit) {
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
                <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align="center"><input onChange={handleFileChange} type="file" accept='application/pdf' className='form-control' /></TableCell>
                    <TableCell>
                        <select value={listAdd.product} onChange={handleChange} name='product' className='form-select text-center' >
                            <option disabled value="default">Select a Product</option>
                            {products?.map((product) => {
                                return <option key={product.id} value={product.name}>{product.name}</option>
                            })}
                        </select>
                    </TableCell>
                    <TableCell align="center"><input onChange={handleChange} value={listAdd.activateDate} name='activateDate' className='form-control text-center' type="date" /></TableCell>
                    <TableCell align="center"><input onChange={handleChange} value={listAdd.expirationDate} name='expirationDate' className='form-control text-center' type="date" /></TableCell>
                    <TableCell align="center"><input onChange={handleChange} value={listAdd.invoice_number} name='invoice_number' className='form-control text-center' type="text" /></TableCell>
                    <TableCell align="center"><input onChange={handleChange} value={listAdd.serial_key} name='serial_key' className='form-control text-center' type="text" /></TableCell>
                    <TableCell align="center">
                        <div className='d-flex flex-1 justify-content-evenly'>
                            <button onClick={handleSaveLicense} style={{ maxWidth: 100 }} className='btn btn-success'><AiOutlineCheck /></button>
                            <button onClick={() => handleToggleEdit(false)} style={{ maxWidth: 100 }} className='btn btn-danger'><HiXMark /></button>
                        </div>
                    </TableCell>


                </TableRow>

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
                <TableRow
                    key={datas.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align='center'>
                        <LiaFileContractSolid fontSize={30} title='Download Contract' className='link' onClick={() => downloadContract(datas.file)} />
                    </TableCell>
                    <TableCell align="center">
                        {datas.name}
                    </TableCell>

                    <TableCell align="center">{datas.start_date}</TableCell>
                    <TableCell align="center">{datas.end_date}</TableCell>
                    <TableCell align="center">{datas.invoice_number}</TableCell>
                    <TableCell align="center">{datas.serial_key}</TableCell>
                    <TableCell align="center">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {actualUser.cargo == 'Administrador' && <HiOutlinePencilSquare className='pencil' onClick={() => handleToggleEdit(true)} />}
                            {actualUser.cargo == 'Administrador' ? <TrashIcon width={20} mt={0} uuid={datas.id} handleClick={() => handleRemoveLicense(datas.id)} /> : <>--</>}
                        </div>
                    </TableCell>
                </TableRow>
            </>
        )
    }

}

export default RowCustom