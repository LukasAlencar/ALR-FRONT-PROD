import React, { useEffect, useState } from 'react'
import '../styles/components/list-licenses.sass';
import { differenceInDays, parse, format } from 'date-fns';
import ItemLicense from './ItemLicense';
import GroupLicenses from './GroupLicenses';

// TODO: Change language to pt-br
// TODO: Remove unused libs
// TODO: Remove unused functions / constants
// TODO: Remove console.log

const ListLicenses = ({ datas }) => {
    const [expired, setExpired] = useState([]);
    const [notExpired, setNotExpired] = useState([]);
    const [expiring, setExpiring] = useState([]);

    useEffect(() => {
        let notExpired = datas.filter(el => verifyDate(el.end_date) == 'expired')
        let expired = datas.filter(el => verifyDate(el.end_date) == 'not-expired')
        let expiring = datas.filter(el => verifyDate(el.end_date) == 'expiring')

        setExpired(expired)
        setNotExpired(notExpired)
        setExpiring(expiring)
    }, [])

    const verifyDate = (dateString) => {
        let parts = dateString.split('-');
        let day = parseInt(parts[2], 10);
        let month = parseInt(parts[1], 10) - 1; // Subtrair 1 do mês (0 a 11)
        let year = parseInt(parts[0], 10);
        let today = new Date()
        let expirationDate = new Date(year, month, day)
        const tenDays = 10 * 24 * 60 * 60 * 1000;
        const lastTenDays = new Date(expirationDate - tenDays);
        expirationDate.setHours(23)
        expirationDate.setMinutes(59)
        if (today >= lastTenDays && today <= expirationDate) {
            return 'expiring'
        }
        if (expirationDate > today) {
            return 'expired'
        } else if (expirationDate <= today) {
            return 'not-expired'
        }
    }

    if (datas.length > 0) {
        return (
            <>
                <GroupLicenses Gtitle="Ativas">
                    <ItemLicense list={notExpired} status={'item-active'} />
                </GroupLicenses>
                <GroupLicenses Gtitle="Expirando">
                    <ItemLicense list={expiring} status={'item-expiring'} />
                </GroupLicenses>
                <GroupLicenses Gtitle="Expiradas">
                    <ItemLicense list={expired} status={'item-expired'} />
                </GroupLicenses>

            </>
        )
    } else {
        return (
            <div className='text-center'>
                Não existe dados
            </div>
        )
    }
}

export default ListLicenses