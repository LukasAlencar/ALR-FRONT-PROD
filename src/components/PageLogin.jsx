import { useContext, useEffect, useState } from 'react'
import Logo from '../img/logo.png'
import '../styles/components/pageLogin.sass'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from "jwt-decode";
import { AnimatePresence, motion } from 'framer-motion'

import axios from 'axios'

import CircularProgress from '@mui/material/CircularProgress';
import { Context } from '../context/AuthContext'

import ModalPattern from './ModalPattern'
import { useForm } from 'react-hook-form';
import Dialog from './Dialog/Dialog';


// TODO: Change language to pt-br
// TODO: Remove unused libs
// TODO: Remove unused functions / constants
// TODO: Remove console.log



const PageLogin = () => {

    const { register, formState: { errors }, handleSubmit } = useForm()

    const { setIsAuth, getApi, actualUser, setDialogAdmin, createAccount, setCreateAccount } = useContext(Context)

    const [isLoading, setIsLoading] = useState(false)

    const [modal, setModal] = useState(false)

    const [dialog, setDialog] = useState({
        isShow: false,
        text: '',
    })

    useEffect(() => {
        if (createAccount) {
            activeDialog('Um e-mail de confirmação foi enviado ao seu e-mail', 'success', 'email')
            setCreateAccount(false)
        }

    }, [])


    const navigate = useNavigate();

    const handleLogin = async (data) => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('email', data.email.trim())
        formData.append('password', data.password)
        await axios.post('https://api.alrtcc.com/login/', formData)
            .then((res) => {
                setIsAuth(true)
                const userLogged = jwtDecode(res.data.token)
                const decodedToken = userLogged.key
                localStorage.setItem('token', decodedToken)
                getApi()
                debugger
                localStorage.setItem('email', userLogged.email)
                setDialogAdmin(userLogged.occupation == "Administrador" ? true : false)
                navigate('/home')
            })
            .catch(() => { setModal(true) })
            .finally(() => { setIsLoading(false) });

    }



    const activeDialog = (text, color, icon) => {
        setDialog((prev) => ({ ...prev, isShow: true, text: text, color: color, icon: icon}))

        setTimeout(() => {
            setDialog((prev) => ({ ...prev, isShow: false, text: '', color: '', icon: '',}));
        }, 5000);
    }

    const handleRegister = () => {
        navigate('/register')
    }

    return (
        <>
            <Dialog text={dialog.text} open={dialog.isShow} />
            <ModalPattern
                toggleModal={() => setModal(!modal)}
                open={modal}
                textTitle={'Usuário não cadastrado.'}
                textBody={'Tente novamente, ou crie um usuário'}
                textBtn1={'Ok'}
                textBtn2={'Cadastrar usuário'}
                handleClick1={() => setModal(false)}
                handleClick2={() => navigate('/register')}
                btn2Variant={'contained'}

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
                                <form action="">
                                    <div className="fields row">
                                        <div className="col-10">
                                            <label className='label-input' htmlFor="licenseName">E-mail</label>
                                            <input
                                                type="text"
                                                className={`form-control mb-1 ${errors?.email && 'error'}`}
                                                placeholder='seu@email.com'
                                                id="email"
                                                {...register("email", { required: true })}
                                            />
                                            {errors?.email?.type === "required" && <span className='error'>Obrigatório *</span>}
                                        </div>
                                    </div>
                                    <div className="fields row">
                                        <div className="col-10">
                                            <label className='label-input' htmlFor="licenseName">Senha</label>
                                            <input
                                                type="password"
                                                className={`form-control mb-1 ${errors?.password && 'error'}`}
                                                placeholder='*******'
                                                id="password"
                                                aria-describedby="licenseName"
                                                {...register("password", { required: true })}
                                            />
                                            {errors?.password?.type === "required" && <span className='error'>Obrigatório *</span>}
                                        </div>
                                    </div>
                                    <div style={{ flex: 1, marginTop: 20 }}>
                                        <div className="login-finish-btn-field">
                                            <button type='submit' onClick={handleSubmit(handleLogin)} className='login-btn'> Entrar </button>
                                            {/* <div className="next-step-btn"><CgPlayTrackNextR/></div> */}
                                        </div>
                                    </div>
                                    <div className="fields row">
                                        <div className="col-10">Não tem uma conta? <span onClick={handleRegister} className='register-span'>Registre-se</span></div>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="container-squares" />
            </motion.div >
        </>
    )
}

export default PageLogin