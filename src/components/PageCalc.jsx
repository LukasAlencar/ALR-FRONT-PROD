import Navbar from './Navbar'
import LeftMenu from './LeftMenu'
import '../styles/components/page-calc.sass'
import { Link } from 'react-router-dom'
import Logo from '../img/logo.png'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { CircularProgress } from '@mui/material'
import ModalPattern from './ModalPattern'

const PageCalc = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState('')
    const [products, setProducts] = useState([])
    const [loadingProducts, setLoadingProducts] = useState(true)
    const [calculateValues, setCalculateValues] = useState([])
    const { register, formState: { errors }, handleSubmit } = useForm()

    const [modal, setModal] = useState({
        isShow: false,
        textTitle: <div className='d-flex align-items-center'>
            Carregando <CircularProgress style={{ fontSize: 'none', width: 15, height: 15, marginLeft: 10 }} />
        </div>,
        textBody: <>
            <div>
                <span className='note-span'>* Note: This query is performed by AI, the expected response time is 30s</span>
            </div>
        </>
    })

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
        setModal((prev) => ({ ...prev, isShow: true }))
        if (!isLoading) {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('product', data.product);
            formData.append('qnty', data.qnt);
            await axios.post('https://api.alrtcc.com/calculate/', formData).then(res => {
                setPage('')
                setCalculateValues(res.data.data)
            }).catch(err => console.error(err)).finally(() => {
                setIsLoading(false)
            })
                .finally(() => {
                    closeModal('', 'finished')
                })
        }
    }

    const closeModal = (event, reason) => {
        if (reason && reason == "backdropClick") {
            return;
        }
        setModal((prev) => ({ ...prev, isShow: false }))

    }

    // <h1>{val.type}</h1>
    // <h2>{val.price}</h2>
    // <p>{val.best}</p>
    // <p>{val.justification}</p>

    const calculateValuesMock = [
        {type: 'OEM', price: 'R$ 1.999,00', best: true, justification: 'OEM é a melhor opção para o cliente, pois é a mais barata e a mais simples de se implementar. O software OEM já vem pré-instalado de fábrica nos servidores e/ou adaptados por montadoras para uma máquina. O cliente só precisa comprar 9 licenças OEM para os seus 9 servidores, sem necessidade de ativação ou registro. Além disso, o software OEM tem o mesmo suporte e garantia da Microsoft que o software FPP ou Volume.'},
        {type: 'FPP', price: 'R$ 2.499,00', best: false, justification: 'FPP é a opção mais cara e menos flexível para o cliente. O software FPP é vendido em caixas lacradas, com um DVD de instalação e uma chave de produto. O cliente precisa instalar o software em cada servidor e ativá-lo online ou por telefone. O software FPP só pode ser usado em um servidor por vez, e se o cliente quiser trocar de servidor, ele precisa desinstalar o software do servidor antigo e reinstalá-lo no novo. Além disso, o software FPP não tem benefícios adicionais de suporte ou garantia da Microsoft.',},
        {type: 'Volume', price: 'R$ 2.199,00', best: false, justification: 'Volume é a opção mais complexa e burocrática para o cliente. O software Volume é vendido por meio de contratos de licenciamento por volume da Microsoft, que exigem um número mínimo de licenças e um período de vigência. O cliente precisa se registrar no portal da Microsoft, receber uma ID de contrato e uma chave de ativação múltipla, e usar um servidor de gerenciamento de licenças para distribuir o software nos seus servidores. O software Volume permite que o cliente troque de servidor sem desinstalar o software, mas ele precisa manter o controle das licenças usadas e não usadas. Além disso, o software Volume tem alguns benefícios adicionais de suporte e garantia da Microsoft, mas eles dependem do tipo de contrato escolhido pelo cliente.',},
        {type: 'Cloud', price: 'R$ 1.599,00 por ano', best: false, justification: 'Cloud é a opção mais inovadora e escalável para o cliente. O software Cloud é vendido por meio de serviços de nuvem da Microsoft, como o Azure ou o Microsoft 365. O cliente não precisa comprar ou instalar o software nos seus servidores, mas sim alugar o software como um serviço, pagando apenas pelo que usar. O software Cloud permite que o cliente acesse o software de qualquer lugar e dispositivo, e se beneficie das atualizações e recursos mais recentes da Microsoft. Além disso, o software Cloud tem o melhor suporte e garantia da Microsoft, incluindo segurança, backup e recuperação de desastres. No entanto, o software Cloud requer uma conexão de internet estável e confiável, e pode ter um custo total mais alto a longo prazo.',},
        ,
    ]

    if (isLoading) {
        return (
            <>
                <ModalPattern
                    toggleModal={closeModal}
                    open={modal.isShow}
                    textTitle={modal.textTitle}
                    textBody={modal.textBody}
                />
                <div className='mask' />
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
                                {calculateValuesMock.map(val => {
                                    return (
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