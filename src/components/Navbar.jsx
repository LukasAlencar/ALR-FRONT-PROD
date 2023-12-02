import '../styles/components/navbar.sass'
import { FiUser } from 'react-icons/fi'
import { IoExitOutline } from 'react-icons/io5'
import Logo from '../img/logo.png'
import MediaQuery from 'react-responsive'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { Context } from '../context/AuthContext'
import createAxiosInstance from '../settings/AxiosSettings'
import { IoPersonOutline } from "react-icons/io5";

// TODO: Change language to pt-br
// TODO: Remove unused libs
// TODO: Remove unused functions / constants
// TODO: Remove console.log

const Navbar = () => {

    const apiALR = createAxiosInstance(localStorage.getItem('token'))
    const { setIsAuth, actualUser } = useContext(Context)
    const [page, setPage] = useState('Home')
    const navigate = useNavigate()
    const imgUser = localStorage.getItem('userImg')
    const userName = localStorage.getItem('userName')
    const userEmail = localStorage.getItem('email')


    const handleLogout = () => {

        setIsAuth(false)
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
        localStorage.removeItem('userImg')

        navigate('/')
    }

    return (
        <nav style={{ position: 'absolute', width: '100vw', height: '8vh', zIndex: 1 }} className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="justify-content-between navbar-nav me-auto mb-2 mb-lg-0">
                        <MediaQuery maxWidth={991}>
                            <li className="nav-item">
                                <Link to="/my-profile">
                                    <span onClick={() => { setPage('profile') }} className={page == 'profile' ? 'nav-link active d-flex align-items-center' : 'nav-link d-flex align-items-center'} href=""><IoPersonOutline/> Meu Perfil</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <span onClick={handleLogout} className="exit nav-link cursor-pointer d-flex align-items-center"><span className='iconExit'><IoExitOutline /></span> Sair</span>
                            </li>

                        </MediaQuery>
                    </ul>
                    <MediaQuery minWidth={992}>
                        <div className="d-flex">
                            <li className="nav-item dropdown">
                                <div className="iconUser d-flex align-items-center nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {/* <FiUser/> */}
                                    <img src={actualUser.img_user} style={{ width: 35, height: 35 }} alt="" />
                                </div>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li className='text-center'>
                                        <span className={page == 'profile' ? 'dropdown-item active' : 'dropdown-item'} style={{color:'gray', fontSize:13}}>{actualUser.name}</span>
                                        <span className={page == 'profile' ? 'dropdown-item active' : 'dropdown-item'} style={{color:'gray', fontSize:13}}>{actualUser.email}</span>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link to="/my-profile">
                                            <span onClick={() => { setPage('profile') }} className={page == 'profile' ? 'dropdown-item active d-flex align-items-center gap-2' : 'dropdown-item d-flex align-items-center gap-2'} href="#"><IoPersonOutline/> Meu Perfil</span>
                                        </Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <span onClick={handleLogout} className="exit dropdown-item cursor-pointer d-flex align-items-center gap-2" ><span className='iconExit'><IoExitOutline /></span> Sair </span>
                                    </li>
                                </ul>
                            </li>
                        </div>
                    </MediaQuery>
                </div>
            </div>
        </nav>
    )
}

export default Navbar