import { TableCell, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { LiaFileContractSolid } from 'react-icons/lia'
import TrashIcon from './TrashIcon'
import axios from 'axios'
import { AiOutlineCheck } from 'react-icons/ai'
import { HiXMark, HiOutlinePencilSquare } from 'react-icons/hi2'

const RowCustomPattern = ({ item, index, handleEdit, canEdit, listHeaderItems, handleRemoveRow }) => {

    const [newRow, SetNewRow] = useState({})
    const userLogged = localStorage.getItem('email')

    // const userLogged = 'opa'


    const [isEdit, setIsEdit] = useState(false)


    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        let name = e.target.name
        SetNewRow(prev => ({ ...prev, [name]: file }))
    }

    const initialState = listHeaderItems.reduce((acc, obj) => {
        acc[obj.itemName] = '';
        return acc;
    }, {});

    // useEffect(() => {
    //     const updatedState = {};

    //     listHeaderItems.forEach((item) => {
    //       if (state.hasOwnProperty(item.itemName)) {
    //         updatedState[item.itemName] = state[item.itemName];
    //       } else {
    //         updatedState[item.itemName] = '';
    //       }
    //     });

    //     setState(updatedState);
    //     console.log(state)

    //   }, [listHeaderItems]);

    const handleAddRow = () => {
        addRows(state)
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

    // useEffect(() => {
    // }, [])

    const handleToggleEdit = (val) => {
        setListAdd((prev) => ({

        }))
        setIsEdit(val)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDynamicState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };


    const initialDynamicState = {};

    // Crie um objeto de estado dinâmico com base em listHeaderItems
    listHeaderItems.forEach((headerItem) => {
        initialDynamicState[headerItem.itemName] = item[headerItem.itemName] || '';
    });

    // Use useState para definir o estado dinâmico inicial
    const [state, setDynamicState] = useState(initialDynamicState);

    useEffect(() => {
        if (item) {
            // Atualize o estado com base nas propriedades de 'item'
            listHeaderItems.forEach((headerItem) => {
                setDynamicState((prevState) => ({
                    ...prevState,
                    [headerItem.itemName]: item[headerItem.itemName] || '',
                }));
            });
        }
    }, [item]);

    const handleCallEdit = () =>{
        setIsEdit(false)
        handleEdit(state)
    }

    if (isEdit) {
        return (
            <>
                <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    {listHeaderItems &&
                        <>
                            {listHeaderItems.map(item => {
                                if (item.editField) {
                                    if (item.fileField.is) {
                                        // addState(item.itemName, '')
                                        return (
                                            <TableCell key={item.itemName} align={item.align || ''}>
                                                <input onChange={handleFileChange} type="file" name={item.itemName} accept={item.fileField.accept ? item.fileField.accept : ''} className='form-control' />
                                            </TableCell>
                                        )
                                    } else {
                                        return (
                                            <TableCell key={item.itemName} align={item.align || ''}>
                                                <input value={state[item.itemName]} onChange={handleChange} name={item.itemName} type='text' maxLength={item.editField.maxLength ? item.editField.maxLength : ''} className='form-control text-center' />
                                            </TableCell>
                                        )
                                    }
                                }
                            })}
                            <TableCell align={'center'}>
                                <div className='d-flex flex-1 justify-content-center'>
                                    <button onClick={handleCallEdit} style={{ maxWidth: 100, marginRight: 10 }} className='btn btn-success'><AiOutlineCheck /></button>
                                    <button onClick={() => setIsEdit(false)} style={{ maxWidth: 100, marginLeft: 10 }} className='btn btn-danger'><HiXMark /></button>
                                </div>
                            </TableCell>
                        </>

                    }


                </TableRow>
            </>
        )
    } else {
        return (
            <>
                <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    {listHeaderItems.map((subItem, indexHeader) => {
                        return (
                            <TableCell key={indexHeader} align="center">{item[subItem.itemName]}</TableCell>
                        )
                    })}
                    <TableCell>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {canEdit ?
                                <>
                                    <HiOutlinePencilSquare className='pencil' onClick={() => handleToggleEdit(true)} />
                                    <TrashIcon width={20} mt={0} uuid={item.id} handleClick={() => handleRemoveRow(item.id)} />
                                </>
                                :
                                <>
                                    --
                                </>
                            }
                        </div>
                    </TableCell>

                </TableRow>
            </>

        )
    }
    //         <TableRow
    //             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //         >
    //             <TableCell align="center"><input onChange={handleFileChange} type="file" accept='application/pdf' className='form-control' /></TableCell>
    //             <TableCell>
    //                 <select value={listAdd.product} onChange={handleChange} name='product' className='form-select text-center' >
    //                     <option disabled value="default">Select a Product</option>
    //                     {products?.map((product) => {
    //                         return <option value={product.productName}>{product.productName}</option>
    //                     })}
    //                 </select>
    //             </TableCell>
    //             <TableCell align="center"><input onChange={handleChange} value={listAdd.activateDate} name='activateDate' className='form-control text-center' type="date" /></TableCell>
    //             <TableCell align="center"><input onChange={handleChange} value={listAdd.expirationDate} name='expirationDate' className='form-control text-center' type="date" /></TableCell>
    //             <TableCell align="center">
    //                 <div className='d-flex flex-1 justify-content-evenly'>
    //                     <button onClick={handleSaveLicense} style={{ maxWidth: 100 }} className='btn btn-success'><AiOutlineCheck /></button>
    //                     <button onClick={() => handleToggleEdit(false)} style={{ maxWidth: 100 }} className='btn btn-danger'><HiXMark /></button>
    //                 </div>
    //             </TableCell>

    //         </TableRow>
    //     )
    // } else {
    //     return (
    //         <TableRow
    //             key={datas.id}
    //             sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //         >
    //             <TableCell align='center'>
    //                 <LiaFileContractSolid fontSize={30} title='Download Contract' className='link' onClick={() => downloadContract(datas.file)} />
    //             </TableCell>
    //             <TableCell align="center">
    //                 {datas.name}
    //             </TableCell>

    //             <TableCell align="center">{datas.start_date}</TableCell>
    //             <TableCell align="center">{datas.end_date}</TableCell>
    //             <TableCell align="center">
    //                 <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    //                     {userLogged == 'lucas@email.com' && <HiOutlinePencilSquare className='pencil' onClick={() => handleToggleEdit(true)} />}
    //                     {userLogged == 'lucas@email.com' ? <TrashIcon width={20} mt={0} uuid={datas.id} handleClick={() => handleRemoveLicense(datas.id)} /> : <>--</>}
    //                 </div>
    //             </TableCell>
    //         </TableRow>

}

export default RowCustomPattern