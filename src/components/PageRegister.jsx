import { useContext, useEffect, useState } from 'react'
import Logo from '../img/logo.png'
import '../styles/components/pageRegister.sass'
import { useNavigate } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'
import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import AlertTop from './AlertTop'
import InputMask from 'react-input-mask'
import ModalPattern from './ModalPattern'
import CircularProgress from '@mui/material/CircularProgress';
import { Context } from '../context/AuthContext'
import { useForm } from 'react-hook-form'

const PageRegister = () => {

    const { setCreateAccount } = useContext(Context)
    const { register, formState: { errors }, handleSubmit } = useForm()

    const navigate = useNavigate()

    const [modal, setModal] = useState({
        isShow: false,
        textTitle: '',
        textBody: '',
    })

    const [isLoading, setIsLoading] = useState(false)

    // Licenses States

    const [isAlert, setIsAlert] = useState(false)

    const handleAlert = () => {
        setIsAlert(false)
    }

    function generateRandomString(length) {
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            result += charset[randomIndex];
        }
        return result;
    }

    const onSubmit = async (data) => {
        setIsLoading(true)

        let passAleatorio = generateRandomString(10)
        let formdata = new FormData();
        let cnpj_formated = data.cnpj.replace(/\D/g, '');
        formdata.append('username', data.name);
        formdata.append('email', data.email);
        formdata.append('enterprise_name', data.enterpriseName);
        formdata.append('cnpj', cnpj_formated);
        formdata.append('img_user', data.user_img[0]);
        formdata.append('password', passAleatorio);

        await axios.post('https://api.alrtcc.com/create_enterprise/', formdata)
            .then(() => {
                setCreateAccount(true)
                navigate('/');
            })
            .catch((err) => {
                if (err.response.data.message === 'Empresa já cadastrada') {
                    setModal((prev) => ({ ...prev, isShow: true, textTitle: <span className='error font-tertiary'>Não foi possível criar a conta.</span>, textBody: <span className='font-tertiary'>Empresa já cadastrada.</span> }))
                } else if (err.response.data.message === 'Email já cadastrado') {
                    setModal((prev) => ({ ...prev, isShow: true, textTitle: <span className='error font-tertiary'>Não foi possível criar a conta.</span>, textBody: <span className='font-tertiary7'>E-mail já cadastrado.</span> }))
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <>
            {isLoading && <>
                <div className='mask' />
                <CircularProgress className='progress-rol' />
            </>
            }
            <ModalPattern
                toggleModal={() => setModal((prev) => ({ ...prev, isShow: false }))}
                open={modal.isShow}
                textTitle={modal.textTitle}
                textBody={modal.textBody}
                textBtn1={'Ok'}
                handleClick1={() => setModal((prev) => ({ ...prev, isShow: false }))}
            />
            <motion.div className="container-main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {isAlert && <AlertTop handleAlert={handleAlert} active={true} text={'Preencha os campos obrigatórios'} />}
                <div className='containerRegister row'>
                    <div className='logo'>
                        <img className='imgLogo' src={Logo} alt="ALR" />
                        <h1>ALR Inventory</h1>
                    </div>
                    <AnimatePresence>
                        <motion.div
                            key='step1'
                            transition={{ delay: .2 }}
                            initial={{ opacity: 0, display: 'none' }}
                            animate={{ opacity: 1, display: 'block' }}
                            exit={{ opacity: 0, display: 'none' }}
                            className="fields-container">
                            <div className="fields row">
                                <div className="col-6">
                                    <label htmlFor="formFile" className="form-label">Imagem de Perfil <span style={{fontSize: 14, color: 'gray'}}> png / jpg / jpeg / gif</span></label>
                                    <input
                                        accept='image/*'
                                        className={`form-control mb-1 ${errors?.user_img && 'error-input-file'}`}
                                        type="file"
                                        id="formFile"
                                        {...register("user_img", {
                                            validate: (value) => {
                                                debugger
                                                let acceptedFormats = ['png', 'jpg', 'jpeg', 'gif', undefined];
                                                let fileExtension = value[0]?.name.split('.').pop().toLowerCase();
                                                if (!acceptedFormats.includes(fileExtension)) {
                                                    return 'Formato inválido';
                                                }
                                                return true;
                                            }
                                        })}
                                    />
                                    {errors?.user_img && <span className="error font-tertiary label-cp">{errors.user_img.message}</span>}
                                </div>
                            </div>
                            <div className="fields row">
                                <div className="col-6">
                                    <input maxLength={22}
                                        name="name"
                                        type="text"
                                        className={`form-control mb-1 ${errors?.name && 'error-input-file'}`}
                                        placeholder='Nome'
                                        id="name"
                                        aria-describedby="Nome"
                                        {...register("name", { required: true })}
                                    />
                                    {errors?.name?.type === 'required' && <span className="error font-tertiary label-cp">Obrigatório *</span>}
                                </div>
                            </div>
                            <div className="fields row">
                                <div className="col-6">
                                    <input
                                        name="enterpriseName"
                                        type="text"
                                        className={`form-control mb-1 ${errors?.enterprise && 'error-input-file'}`}
                                        placeholder='Empresa'
                                        id="enterprise"
                                        aria-describedby="Empresa"
                                        {...register("enterprise", { required: true })}
                                    />
                                    {errors?.enterprise?.type === 'required' && <span className="error font-tertiary label-cp">Obrigatório *</span>}

                                </div>
                            </div>
                            <div className="fields row">
                                <div className="col-6">
                                    <InputMask mask={'99.999.999/9999-99'}
                                        name="cnpj"
                                        type="text"
                                        className={`form-control mb-1 ${errors?.cnpj && 'error-input-file'}`}
                                        placeholder='CNPJ'
                                        id="cnpj"
                                        aria-describedby="CNPJ"
                                        {...register("cnpj",
                                            {
                                                required: true,
                                                validate: (value) => {
                                                    return value !== '__.___.___/____-__';
                                                },
                                                pattern: {
                                                    value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
                                                    message: 'CNPJ Inválido'
                                                },
                                                testNum: (value) => {
                                                    const numericRegex = /^[0-9]+$/;
                                                    return numericRegex.test(value);
                                                },
                                            })}
                                    />
                                    {errors?.cnpj?.type === 'required' && <span className="error font-tertiary label-cp">Obrigatório *</span>}
                                    {errors?.cnpj?.type === 'validate' && <span className="error font-tertiary label-cp">Obrigatório *</span>}
                                    {errors?.cnpj?.type === 'pattern' && <span className="error font-tertiary label-cp">{errors.cnpj.message}</span>}


                                </div>
                            </div>
                            <div className="fields row">
                                <div className="col-6">
                                    <input
                                        name="email"
                                        type="email"
                                        className={`form-control mb-1 ${errors?.email && 'error-input-file'}`}
                                        placeholder='Email'
                                        id="email"
                                        aria-describedby="email"
                                        {...register("email",
                                            {
                                                required: true,
                                                pattern: {
                                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                                    message: 'Email inválido'
                                                },
                                            })
                                        }
                                    />
                                    {errors?.email?.type === 'pattern' && <span className="error font-tertiary label-cp">{errors.email.message}</span>}
                                    {errors?.email?.type === 'required' && <span className="error font-tertiary label-cp">Obrigatório *</span>}

                                </div>
                            </div>
                            <div className="register-btn-field">
                                <div onClick={() => handleSubmit(onSubmit)()} className='register-btn'> Registrar <AiOutlineArrowRight /> </div>
                            </div>
                            <div className='have-account'>
                                Já possui uma conta? <span onClick={() => { navigate('/') }}>Login</span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className="containerImage">

                </div>
            </motion.div>
        </>
    )
}

export default PageRegister