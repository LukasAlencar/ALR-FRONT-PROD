import { useContext, useEffect, useState } from 'react'
import Logo from '../img/logo.png'
import '../styles/components/pageLogin.sass'
import { useNavigate } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { jwtDecode } from "jwt-decode";
import { AnimatePresence, motion } from 'framer-motion'

import Loader from './Loader'
import AlertTop from './AlertTop'
import axios from 'axios'

import CircularProgress from '@mui/material/CircularProgress';
import { Context } from '../context/AuthContext'

import ModalPattern from './ModalPattern'

const PageLogin = () => {

    const { isAuth, setIsAuth, setUserLogged, setActualUser, getApi } = useContext(Context)

    const [isLoading, setIsLoading] = useState(false)

    const [modal, setModal] = useState(false)

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const handleEmail = (val) => {
        setData({ ...data, email: val })
    }
    const handlePassword = (val) => {
        setData({ ...data, password: val })
    }

    const handleLogin = async () => {
        setIsLoading(true)
        const formData = new FormData()
        debugger
        formData.append('email', data.email)
        formData.append('password', data.password)
        await axios.post('https://api.alrtcc.com/login/', formData)
            .then((res) => {
                setIsAuth(true)
                const userLogged = jwtDecode(res.data.token)
                const decodedToken = userLogged.key
                localStorage.setItem('token', decodedToken)
                getApi()
                localStorage.setItem('email', userLogged.email)
                navigate('/home')
            })
            .catch(()=>{setModal(true)})
            .finally(() => { setIsLoading(false) });

    }

    const handleRegister = () => {
        navigate('/register')
    }

    const toggleModal = () =>{
        setModal(!modal)
    }
    return (
        <>
            <ModalPattern 
                toggleModal={()=>setModal(!modal)}
                open={modal} 
                textTitle={'User not Found'}
                textBody={'Try Again'}
                textBtn1={'Ok'}
                handleClick1={()=>setModal(false)}
            />
            {isLoading && <>
                <div className='mask' />
                <CircularProgress className='progress-rol' />
            </>
            }
            <motion.div className="container-main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className='containerLogin row'>
                    <div className='logo'>
                        <img className='imgLogo' src={Logo} alt="ALR" />
                        <h1>ALR Inventory</h1>
                    </div>
                    <AnimatePresence>
                        <motion.div
                            key='login'
                            transition={{ delay: .2 }}
                            initial={{ opacity: 0, display: 'none' }}
                            animate={{ opacity: 1, display: 'flex' }}
                            exit={{ opacity: 0, display: 'none' }} className="fields-container-step2">
                            <div className="section-login">
                                <div className="fields row">
                                    <div className="col-10">
                                        <span></span>
                                    </div>
                                </div>
                                <div className="fields row">
                                    <div className="col-10">
                                        <label className='label-input' htmlFor="licenseName">Email</label>
                                        <input value={data.email} onChange={e => handleEmail(e.target.value)} type="text" className={"form-control"} placeholder='your@email.com' id="email" aria-describedby="licenseName" />
                                    </div>
                                </div>
                                <div className="fields row">
                                    <div className="col-10">
                                        <label className='label-input' htmlFor="licenseName">Password</label>
                                        <input value={data.password} onChange={e => handlePassword(e.target.value)} type="password" className={"form-control"} placeholder='*******' id="password" aria-describedby="licenseName" />
                                    </div>
                                </div>
                                <div style={{ flex: 1, marginTop: 20 }}>
                                    <div className="login-finish-btn-field">
                                        <div onClick={handleLogin} className='login-btn'> Login </div>
                                        {/* <div className="next-step-btn"><CgPlayTrackNextR/></div> */}
                                    </div>
                                </div>
                                <div className="fields row">
                                    <div className="col-10">Don´t have an account? <span onClick={handleRegister} className='register-span'>Register</span></div>
                                </div>

                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="container-squares" />
            </motion.div>
        </>
    )
}

export default PageLogin