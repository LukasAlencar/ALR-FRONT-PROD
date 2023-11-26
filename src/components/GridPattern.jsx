import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import React, { useEffect, useState } from 'react'
import RowCustom from './RowCustom';
import RowCustomPattern from './RowCustomPattern';

const GridPattern = ({ component, listHeaderItems, addRows, listBodyItems, handleRemoveRow, handleEdit, downloadIcon, downloadFunction, canEdit }) => {
    const [newRow, SetNewRow] = useState({})
    const values = []

    // const addState = (key, initialValue) => {
    //     if (values.indexOf(key) == -1) {
    //         values.push(key)


    //     }

    // }

    const initialState = listHeaderItems.reduce((acc, obj) => {
        acc[obj.itemName] = '';
        return acc;
    }, {});

    const [state, setState] = useState(initialState);

    useEffect(() => {
        const updatedState = listHeaderItems.reduce((acc, obj) => {
            if (!state.hasOwnProperty(obj.itemName)) {
                acc[obj.itemName] = '';
            } else {
                acc[obj.itemName] = state[obj.itemName];
            }
            return acc;
        }, {});

        setState(updatedState);
    }, [listHeaderItems]);

    const handleAddRow = () => {
        addRows(state)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));

    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        let name = e.target.name
        SetNewRow(prev => ({ ...prev, [name]: file }))
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.substring(1);
    }
    return (
        <>
            <TableContainer className='mt-4' style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto' }} component={'Paper'}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        {listHeaderItems &&
                            <TableRow>
                                {listHeaderItems.map(item => {
                                    let itemUpper = capitalizeFirstLetter(item.itemName)

                                    return (
                                        <TableCell align={item.align}>{itemUpper}</TableCell>
                                    )
                                })}
                                {canEdit && <TableCell align={'center'}>Actions</TableCell>}

                            </TableRow>

                        }
                    </TableHead>
                    <TableBody>
                        {addRows &&

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
                                                        <TableCell align={item.align || ''}>
                                                            <input onChange={handleFileChange} type="file" name={item.itemName} accept={item.fileField.accept ? item.fileField.accept : ''} className='form-control' />
                                                        </TableCell>
                                                    )
                                                } else {
                                                    // addState(item.itemName, '')
                                                    return (
                                                        <TableCell align={item.align || ''}>
                                                            <input value={state[item.name]} onChange={handleChange} name={item.itemName} type='text' maxLength={item.editField.maxLength ? item.editField.maxLength : ''} className='form-control text-center' />
                                                        </TableCell>
                                                    )
                                                }
                                            }
                                        })}
                                        <TableCell align={'center'}><button onClick={() => handleAddRow(newRow)} style={{ width: 100 }} className='btn btn-primary'>Add +</button></TableCell>
                                    </>

                                }


                            </TableRow>
                        }
                        {listBodyItems &&
                            <>
                                {listBodyItems &&
                                    <>
                                        {listBodyItems.slice().reverse()?.map((item, index) => (
                                            <RowCustomPattern
                                                downloadIcon={downloadIcon}
                                                downloadFunction={downloadFunction}
                                                item={item}
                                                index={index}
                                                listBodyItems={listBodyItems}
                                                listHeaderItems={listHeaderItems}
                                                handleEdit={handleEdit}
                                                handleRemoveRow={handleRemoveRow}
                                                canEdit={canEdit}
                                            />
                                        ))}
                                    </>
                                }




                            </>}
                        {/* {listBodyItems && <>
                            {listBodyItems.slice().reverse()?.map((item, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {listHeaderItems.map((subItem, indexHeader) => {
                                        return (
                                            <TableCell key={indexHeader} align="center">{item[subItem.itemName]}</TableCell>
                                        )
                                    })}
                                    {handleRemoveRow ? <TableCell onClick={() => handleRemoveRow(item.id)} id={item.id} align={'center'}>---</TableCell> : <TableCell id={item.id} align={'center'}>--</TableCell>}
                                </TableRow>
                            ))}


                        </>} */}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default GridPattern