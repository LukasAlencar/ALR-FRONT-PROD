import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '../../../styles/components/change-password-dynamic.sass'
import Logo from '../../../img/logo.png'
import { useForm } from 'react-hook-form'
import { jwtDecode } from 'jwt-decode'



const ChangePasswordDynamic = () => {
    const { token } = useParams()
    const [user, setUser] = useState()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: {errors}, watch } = useForm()

    const watchPassword = watch("new_password")
    const envToken = import.meta.env.VITE_TOKEN_REACT_API
    useEffect(() => {
        (async () => {
            let auxToken = token.slice(2, -1)
            debugger
            const jwt = atob(auxToken);
            let auxUser = jwtDecode(jwt) 
            setUser(auxUser)
            console.log(auxUser)
        })()    
    }, [])

    const onSubmit = async (data) => {
        let formData =  new FormData();
        formData.append('password', data.new_password)
        formData.append('status', true)
        console.log(user)
        debugger
        await axios.put(`https://api.alrtcc.com/user/${user.id}/`, formData,
        {headers: {'Authorization': 'Token '+ user.key}})
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }
    
    return (
        <div className='body-cp'>
            <div className='bg'></div>
            <div className='section-page-cp'>
                <div className='logo-cp'>
                    <Link to="/home">
                        <span className="a-logo"><img className='img-logo' src={Logo} alt="Home" /><div className="logoName">ALR</div></span>
                    </Link>
                </div>
                <div className='form-cp'>
                    <h1 className='text-center mb-7 h2 font-tertiary'>Change your password!</h1>
                    <div className="form-group mb-4 col-6">
                        <label className='font-tertiary label-cp' htmlFor="password">New Password</label>

                        <input 
                            {
                                ...register("new_password", 
                                {
                                    required: true,
                                    minLength: 8,
                                })
                            }
                            id='password'
                            className={`form-control mb-1 ${errors?.new_password && ' error'}`}
                            type="password"
                        />
                        
                        {errors?.new_password?.type === 'required' && <span className='error font-tertiary label-cp'>Required *</span>}
                        {errors?.new_password?.type === 'minLength' && <span className='error font-tertiary label-cp'>Password must be 8 characteres</span>}

                    </div>
                    <div className="form-group mb-4 col-6">
                        <label className='font-tertiary label-cp' htmlFor="password">Password Confirmation</label>

                        <input 
                            {...register("confirm_password", 
                                {
                                    validate: (value) => value === watchPassword,
                                    required: true,
                                    minLength: 8,
                                }
                            )}
                            id='passwordConfirmation'
                            className={`form-control mb-1 ${errors?.confirm_password && ' error'}` }
                            type="password"
                        />
                        { errors?.confirm_password?.type == "validate" && <span className='error font-tertiary label-cp'>Passwords doesn't match</span>}
                        { errors?.confirm_password?.type == "minLength" && <span className='error font-tertiary label-cp'>Password must be 8 characteres</span>}
                        { errors?.confirm_password?.type == "required" && <span className='error font-tertiary label-cp'>Required *</span>}

                    </div>
                    <button onClick={()=> handleSubmit(onSubmit)()} className='btn btn-primary col-6 font-tertiary'> Ok!</button>
                </div>


            </div>
        </div>
    )
}

export default ChangePasswordDynamic