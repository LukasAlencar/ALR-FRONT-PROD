import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  createAxiosInstance  from '../settings/AxiosSettings'
export const Context = createContext()

export const AuthProvider = ({ children }) => {
    const [dialogAdmin, setDialogAdmin] = useState(false);
    const [isAuth, setIsAuth] = useState(false)
    const [loading, setIsLoading] = useState(true)
    const [token, setToken] = useState('')
    const [userLogged, setUserLogged] = useState('')
    const [actualUser, setActualUser] = useState(
        {name:'', email:'', img_user:'', enterprise: '', status: '', cargo: '', id: '', teenant: '',}
    )
    const [createAccount, setCreateAccount] = useState(false)

    const navigate = useNavigate()


    const handleActualUser = (name, email, img_user, enterprise, status, cargo, id, key, teenant) =>{
        setActualUser({
            name,
            email,
            img_user,
            enterprise,
            status,
            cargo,
            id,
            key,
            teenant,
        })
    }

    const getApi = async () =>{
        setIsLoading(true)
        const token = localStorage.getItem('token')
        let formData = new FormData()
        formData.append('token', token)

        await axios.post('https://api.alrtcc.com/verify-token/', formData).then(res => {

            let name = res.data.data.user.name;
            let email = res.data.data.user.email;
            let img_user = res.data.data.user.img_user;
            let enterprise = res.data.data.user.enterprise;
            let status = res.data.data.user.status;
            let cargo = res.data.data.user.cargo;
            let id = res.data.data.user.id;
            let teenant = res.data.data.user.teenant;
            

            setIsAuth(true)

            handleActualUser(name, email, img_user, enterprise, status, cargo, id, token, teenant)
            localStorage.setItem('userName', name)
            localStorage.setItem('email', email)
            localStorage.setItem('userImg', img_user)

            if(window.location.pathname == '/'){
                debugger
                navigate('/home')
            }
        
        })
        .catch(()=>{}).finally(()=> setIsLoading(false))
    }

    useEffect(() => {
        if(!navigator.onLine){
            alert("You don't have connection established")
        }
        const auxToken = localStorage.getItem('token');
        setToken(auxToken)
        getApi(auxToken)
    }, [])

    // const handleLogin = async () => {
    //     setIsLoading(true)
    //     const formData = new FormData()
    //     formData.append('email', data.email)
    //     formData.append('password', data.password)
    //     await axios.post('https://api.alrtcc.com/login/', formData)
    //     .then((res) => {
    //         setIsAuth({auth: true, token: res.data.token})
    //         localStorage.setItem('token', res.data.token)
    //         navigate('/home')
    //     })
    //     .catch((err) => console.log(err))
    //     .finally(()=>{setIsLoading(false)});

    // }

    if (loading) {
        return <div>Carregando</div>
    }else{
        return (
            <Context.Provider value={{ isAuth, 
                setIsAuth, 
                token, 
                userLogged, 
                setUserLogged, 
                actualUser, 
                setActualUser, 
                getApi, 
                dialogAdmin, 
                setDialogAdmin,
                createAccount,
                setCreateAccount
            
            }}>
                {children}
            </Context.Provider>
        )
    }

    
}

