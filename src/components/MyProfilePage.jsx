import React, { useContext, useRef, useState } from 'react'
import LeftMenu from './LeftMenu'
import Navbar from './Navbar'
import '../styles/components/my-profile.sass'
import { Context } from '../context/AuthContext'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import InputEdit from './InputEdit'
import createAxiosInstance from '../settings/AxiosSettings'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import ModalPattern from './ModalPattern'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { AnimatePresence, motion } from 'framer-motion'
import PersonDefault from '../img/person.jpg'


function MyProfilePage() {
  const navigate = useNavigate()
  const { actualUser, getApi } = useContext(Context)
  const apiALR = createAxiosInstance(actualUser.key)
  const [isLoading, setIsLoading] = useState(false)
  const [pencilShow, setPencilShow] = useState(false)
  const [photo, setPhoto] = useState(actualUser.img_user ? actualUser.img_user : PersonDefault)

  const [modal, setModal] = useState({
    isShow: false,
    textTitle: '',
    textBody: '',
  })


  const user_img = useRef()

  const calcFontSize = () => {
    const fontSize = Math.max(15, Math.min(25, 35 - actualUser.name.length));
    return fontSize;
  };

  const handleEditName = async (data) => {
    if (data.input.length <= 22) {
      let formData = new FormData();
      formData.append('name', data.input);
      apiALR.put(`/user/${actualUser.id}/`, formData)
        .then(() => {
          getApi()
        })
        .catch(() => {
          setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Ocorreu um erro!', textBody: 'Não foi possível alterar o nome, tente novamente mais tarde' }))
        })
    } else {
      setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Ocorreu um erro!', textBody: 'Máximo de caracteres possível: 22' }))

    }
  }
  const handleEditPassword = (data) => {
    let patternPass = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/
    if (patternPass.test(data.input)) {

      let formData = new FormData();
      formData.append('password', data.input);
      apiALR.put(`/user/${actualUser.id}/`, formData)
        .then(() => {
          getApi()
        })
        .catch((err) => {
          setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Ocorreu um erro!', textBody: 'Não foi possível alterar a senha, tente novamente mais tarde' }))
        })
    } else {
      setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Ocorreu um erro!', textBody: 'A senha deve ter: ao menos 8 caracteres, 1 caractere especial e 1 caractere maiúsculo' }))

    }
  }

  const handleDeleteAccount = () => {
    setModal((prev) => ({
      ...prev,
      isShow: true,
      textTitle: <span className='error'>Tem certeza?!</span>,
      textBtn1: 'CANCEL',
      textBody:
        <>
          Tem certeza que deseja deletar <span style={{ fontWeight: 'bold' }}>SUA CONTA?</span>
          <br />
          <span style={{ color: 'gray', fontSize: 13 }}>* Isso não pode ser desfeito.</span>

        </>,
      textBtn2: 'DELETE',
      handleClick2: deleteAccount
    }))
  }
  const deleteAccount = async () => {

    let id = actualUser.id
    setIsLoading(true)
    await apiALR.delete('https://api.alrtcc.com/user/' + id)
      .then(() => {
        navigate('/')
      })
      .catch(() => {
        setModal((prev) => ({ ...prev, handleClick1: closeModal, isShow: true, textTitle: <span className='font-tertiary'>Ocorreu um erro!</span>, textBody: 'Não foi possível deletar o usuário, tente novamente mais tarde!' }))
      })
      .finally(() =>
        setIsLoading(false)
      )
  }

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isShow: false }))
  }

  const handleConfirmChange = (file) => {
    setModal((prev) => ({ ...prev, isShow: false }))

    setIsLoading(true)
    let formData = new FormData()
    formData.append('img_user', file)

    apiALR.put(`user/${actualUser.id}/`, formData)
      .then(() => {
        getApi()
      })
      .catch(() => {
        setModal((prev) => ({ ...prev, handleClick1: closeModal, isShow: true, textTitle: <span className='font-tertiary'>Ocorreu um erro!</span>, textBody: 'Não foi possível alterar a sua imagem, tente novamente mais tarde!' }))
      })
      .finally(() => setIsLoading(false));

    if (user_img.current) {
      user_img.current.value = '';
    }
  }

  const handleImageChange = (e) => {
    const { files } = e.target
    const file = files[0]
    debugger
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setModal((prev) => ({ ...prev, handleClick1: () => handleConfirmChange(file), isShow: true, textTitle: <span className='font-tertiary'>Deseja alterar sua imagem?</span>, textBody: <img src={reader.result} /> }))
      };
      reader.readAsDataURL(file);
    }
  }

  if (isLoading) {
    return (
      <>
        <div className='mask' />
        <CircularProgress className='progress-rol' />
      </>
    )
  }
  return (
    <>
      <ModalPattern
        toggleModal={() => setModal((prev) => ({ ...prev, isShow: false }))}
        open={modal.isShow}
        textTitle={modal.textTitle}
        textBody={modal.textBody}
        textBtn1={modal.textBtn1 ? modal.textBtn1 : 'Ok'}
        textBtn2={modal.textBtn2}
        handleClick2={modal.handleClick2}
        colorBtn2={'error'}
        handleClick1={modal.handleClick1 ? modal.handleClick1 : () => setModal((prev) => ({ ...prev, isShow: false }))}
      />
      <div className='bg'></div>
      <LeftMenu />
      <Navbar />
      <div style={{ marginTop: '8vh', marginLeft: '15vw' }} className='section-list-user'>
        <div className="card-left-user card-user">
          <div className="user-img w-100">
            <div onMouseEnter={() => setPencilShow(true)} onMouseLeave={() => setPencilShow(false)} style={{ backgroundImage: `url(${photo})` }} className="img-user-my-profile-bg">
              <AnimatePresence>

                <motion.div
                  style={{ zIndex: 2, width: '100%', height: '100%', }}
                  className={(!pencilShow ? `d-none` : 'd-flex') + ' justify-content-center'}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: .1 }}
                  key={'Pencil'}
                  exit={{
                    opacity: 0,
                    transition: { duration: .1, },
                  }}
                >
                  <label htmlFor='img_user' title={'Escolha um arquivo'} className='labelInputContract input-pencil d-flex w-100 justify-content-center align-items-center'><HiOutlinePencilSquare /></label>
                  <input ref={user_img} id='img_user' onChange={handleImageChange} type="file" accept='image/*' className='inputFileContract' />
                </motion.div>

              </AnimatePresence>
            </div>
            {/* <img className='img-user-my-profile' src={actualUser.img_user} alt="" /> */}
          </div>
          <div className={'name-user'} style={{ fontSize: calcFontSize() }}>
            {actualUser.name.charAt(0).toUpperCase() + actualUser.name.slice(1)}
          </div>
          <div className="email-user">
            {actualUser.email}
          </div>
          <div className="position-user">
            {actualUser.cargo}
          </div>
        </div>
        <div className="card-right-user card-user">
          <List sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <ListItem
              style={{ flex: 1, alignItems: 'center' }}
              alignItems="flex-start">
              <ListItemText
                secondary={
                  <>
                    <Typography
                      style={{ marginRight: 5 }}
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Nome:
                    </Typography>
                    <InputEdit onSubmit={handleEditName} valueDefault={actualUser.name.charAt(0).toUpperCase() + actualUser.name.slice(1)} typeInput={'text'} />
                  </>
                }
              />
            </ListItem>
            <Divider variant='middle' component="li" />
            <ListItem
              style={{ flex: 1, alignItems: 'center' }}
              alignItems="flex-start">

              <ListItemText
                secondary={
                  <>
                    <Typography
                      className="mr-2"
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      E-mail
                    </Typography>
                    {': ' + actualUser.email}
                  </>
                }
              />
            </ListItem>
            <Divider variant='middle' component="li" />
            <ListItem
              style={{ flex: 1, alignItems: 'center' }}
              alignItems="flex-start">
              <ListItemText
                secondary={
                  <>
                    <Typography
                      style={{ marginRight: 5 }}
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Senha:
                    </Typography>
                    <InputEdit valueDefault={"********"} onSubmit={handleEditPassword} typeInput={"password"} />
                  </>
                }
              />
            </ListItem>
            {!actualUser.teenant && (
              <>
                <Divider variant='middle' component="li" />
                <ListItem
                  style={{ flex: .3, alignItems: 'center', justifyContent: 'center' }}
                  alignItems="flex-center"
                >

                  <Typography
                    style={{ marginRight: 5, textAlign: 'center' }}
                    sx={{ display: 'inline' }}
                    component="div"
                    variant="body2"
                    className='delete-account-link'
                    onClick={() => { handleDeleteAccount(actualUser.id) }}
                  >
                    Deletar conta
                  </Typography>
                </ListItem>
              </>
            )}
          </List>
        </div>
      </div>
    </>
  )
}

export default MyProfilePage