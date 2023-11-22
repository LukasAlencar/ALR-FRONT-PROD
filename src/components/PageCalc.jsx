import Navbar from './Navbar'
import LeftMenu from './LeftMenu'
import '../styles/components/page-calc.sass'
import { Link } from 'react-router-dom'
import Logo from '../img/logo.png'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CircularProgress } from '@mui/material'

const PageCalc = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState('calc')
    const [products, setProducts] = useState([])
    const [loadingProducts, setLoadingProducts] = useState(true)
    const [calculateValues, setCalculateValues] = useState([])
    const { register, formState: { errors }, handleSubmit } = useForm()

    useEffect(() => {
        (async () => {
            await axios.get('https://api.alrtcc.com/products/').then(res => {
                setProducts(res.data)
            })
            .catch(err => console.log(err))
            .finally(() => {
                setLoadingProducts(false)
            })

        })()
    }, [])

    const onSubmit = async (data) => {
        if (!isLoading) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('product', data.product);
            formData.append('qnty', data.qnt);
            await axios.post('https://api.alrtcc.com/calculate/', formData).then(res => {
                console.log(res);
                setPage('')
                setCalculateValues(res.data.data)
            }).catch(err => console.error(err)).finally(() => {
                setIsLoading(false)
            })
        }
    }

    if (isLoading) {
        return (
            <>
                <div className='mask' />
                <CircularProgress className='progress-rol' />
            </>)
    } else {
        return (
            <>
                <Navbar />
                <LeftMenu />
                <div className="bg"></div>
                <div style={{ marginTop: '8vh', marginLeft: '15vw' }} className='section-calc'>
                    {page == 'calc' ?
                        <div className="section-page-cp">
                            <div className='logo-cp'>
                                <Link to="/home">
                                    <span className="a-logo"><img className='img-logo' src={Logo} alt="Home" /><div className="logoName">ALR</div></span>
                                </Link>
                            </div>
                            <div style={{ marginTop: -20 }} className='form-cp'>
                                <h1 className='text-center mb-7 h2 font-tertiary'>Calculator</h1>
                                <div className="form-group mb-4 col-6">
                                    <label className='mb-1 font-tertiary label-cp' htmlFor="qnt">Quantity</label>
                                    <input
                                        id='qnt'
                                        className={`form-control ${errors?.qnt && 'error'}`}
                                        type="number"
                                        {...register("qnt", { required: true, validate: (value) => value <= 2147483647 })}
                                    />
                                    {errors?.qnt?.type === 'required' && <span className='error font-tertiary label-cp'>Required *</span>}
                                    {errors?.qnt?.type === 'validate' && <span className='error font-tertiary label-cp'>The largest possible number is 2147483647</span>}

                                </div>
                                <div className="form-group mb-4 col-6">
                                    <label className='mb-1 font-tertiary label-cp ' htmlFor="product">Product</label>
                                    <select
                                        className={`form-select ${errors?.product && 'error-select'}`}
                                        id="product"
                                        {...register("product",
                                            {
                                                required: true,
                                                validate: (value) => value != "0",
                                            })}>
                                        <option className={errors?.product && 'error'} value="0">Select a Product</option>
                                        {loadingProducts && <option disabled value="0">Loading...</option>}
                                        {products?.map(product => {
                                            return <option key={product.id} value={product.id}>{product.name}</option>
                                        })}

                                    </select>
                                    {errors?.product?.type === 'required' && <span className='error font-tertiary label-cp'>Required *</span>}
                                    {errors?.product?.type === 'validate' && <span className='error font-tertiary label-cp'>Value Invalid</span>}
                                </div>
                                <button onClick={() => handleSubmit(onSubmit)()} className='btn btn-primary col-6 font-tertiary'>Calculate</button>
                                <span className='note-span'>* Note: This query is performed by AI, the expected response time is 30s </span>
                            </div>
                        </div>
                        :
                        <>
                            <div className="response-calc-main">
                                {calculateValues.map(val=>{
                                    return(
                                        <div className="section-page-resp-calc">
                                            <h1>{val.type}</h1>
                                            <h2>{val.price}</h2>
                                            <p>{val.best}</p>
                                            <p>{val.justification}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </>
                    }

                </div>
            </>
        )
    }
}

export default PageCalc