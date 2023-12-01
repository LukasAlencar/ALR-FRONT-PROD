import React from 'react'


const licenseTypeStatus = (status) =>{
    switch(status){
        case 'item-expired': return 'expirada'
        case 'item-expiring': return 'expirando'
        case 'item-active': return 'ativa'
    }
}

const ItemLicense = ({ list, status }) => {
    if(list.length > 0){
    return (
        <>
            {
                list.map(el => {
                    return (
                        <div className={'item-license ' + status} key={el.id}>
                            <div className="row text-align-center width-100">
                                <div className="col-sm">
                                    {el.serial_key ? el.serial_key : '--'}
                                </div>
                                <div className="col-sm">
                                    {el.invoice_number ? el.invoice_number : '--'}
                                </div>
                                <div className="col-sm">
                                    {el.name}
                                </div>
                                <div className="col-sm">
                                    {el.start_date}
                                </div>
                                <div className="col-sm">
                                    {el.end_date}
                                </div>
                            </div>
                        </div>

                    )
                })
            }

        </>
    )}else{
        return (
            <div className={'item-license ' + status}>
                <div className="row justify-content-center text-align-center width-100">
                    Não existe nenhuma licença {licenseTypeStatus(status)}
                </div>
            </div>
        )
    }

}

export default ItemLicense