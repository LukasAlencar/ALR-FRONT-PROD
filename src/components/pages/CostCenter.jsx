import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import LeftMenu from '../LeftMenu'


import GridPattern from '../GridPattern';


const CostCenter = () => {

    const handleAddCostCenter = async (values) => {
        // setIsLoading(true)
        // let passAleatorio = generateRandomString(10)
        // const formData = new FormData();
        // formData.append('name', user.name)
        // formData.append('email', user.email)
        // formData.append('img_user', user.img_user)
        // formData.append('password', passAleatorio)

        // console.log(user)
        // await apiALR.post('https://api.alrtcc.com/register/', formData)
        // .then(res => console.log(res))
        // .catch((err) => console.log(err))
        // .finally(()=>{
        //   setIsLoading(false)
        // })

        // const res = await apiALR.get('https://api.alrtcc.com/users/?format=json');
        // setRows(res.data)
        let aux = { id: 4, name: values.name, address: values.address, enterprise: 0 }


        setListBodyItems([...listBodyItems, aux])

    }

    useEffect(()=>{
    },[])

    const handleRemoveCostCenter = (id) => {
        console.log(id)
    }

    const listHeaderItems = [
        { itemName: 'name', align: 'center', fileField: { is: false, accept: '' }, editField: { is: true, maxLength: 100 }, },
        { itemName: 'address', align: 'center', fileField: false, editField: true },
    ]

    const [listBodyItems, setListBodyItems] = useState([
        { id: 0, name: "Centro de custo 1", address: "Endereço 1", enterprise: 0 },
        { id: 1, name: "Centro de custo 2", address: "Endereço 2", enterprise: 0 },
        { id: 3, name: "Centro de custo 3", address: "Endereço 3", enterprise: 0 },
    ])

    const handleEdit = (values) =>{
        console.log(values)
    }

    return (
        <>
            <Navbar />
            <div className='d-flex flex-1'>
                <LeftMenu />
                <div style={{ marginTop: '8vh', marginLeft: '15vw' }} className='section-list-contracts'>
                    <GridPattern
                        canEdit={true}
                        handleEdit={handleEdit}
                        listHeaderItems={listHeaderItems}
                        listBodyItems={listBodyItems}
                        handleRemoveRow={handleRemoveCostCenter}
                        addRows={(values) => { handleAddCostCenter(values) }}
                    />
                </div>

            </div>
        </>
    )
}

export default CostCenter