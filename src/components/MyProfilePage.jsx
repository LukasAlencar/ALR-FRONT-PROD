import React, { useContext, useState } from 'react'
import LeftMenu from './LeftMenu'
import Navbar from './Navbar'
import '../styles/components/my-profile.sass'
import { Context } from '../context/AuthContext'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import InputEdit from './InputEdit'
import createAxiosInstance from '../settings/AxiosSettings'
import { Navigate, useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import ModalPattern from './ModalPattern'

function MyProfilePage() {
  const navigate = useNavigate()
  const { actualUser, token, getApi } = useContext(Context)
  const apiALR = createAxiosInstance(actualUser.key)
  const [isLoading, setIsLoading] = useState(false)

  const [modal, setModal] = useState({
    isShow: false,
    textTitle: '',
    textBody: '',
  })

  const calcFontSize = () => {
    const fontSize = Math.max(15, Math.min(25, 35 - actualUser.name.length));
    return fontSize;
  };

  const handleEditName = async (data) => {
    if (data.input.length <= 22) {
      let formData = new FormData();
      formData.append('name', data.input);
      apiALR.put(`/user/${actualUser.id}/`, formData)
        .then((res) => {
          console.log(res)
          getApi()
        })
        .catch((err) => { console.log(err) })
    } else {
      setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Error!', textBody: 'Max Characteres lenght is 22!' }))

    }
  }
  const handleEditPassword = (data) => {
    let patternPass = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/
    if(patternPass.test(data.input)){

      let formData = new FormData();
      formData.append('password', data.input);
      apiALR.put(`/user/${actualUser.id}/`, formData)
      .then((res) => {
        console.log(res)
        getApi()
      })
      .catch((err) => { console.log(err) })
    }else {
      setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Error!', textBody: 'Password must have a minimum of 8 characters, at least 1 uppercase character, and at least 1 special character.' }))

    }
  }


  const handleDeleteAccount = () => {
    setModal((prev) => ({
      ...prev,
      isShow: true,
      textTitle: <span className='error'>Are you sure?!</span>,
      textBtn1: 'CANCEL',
      textBody:
        <>
          Are you sure to delete <span style={{ fontWeight: 'bold' }}>YOUR ACCOUNT?</span>
          <br />
          <span style={{ color: 'gray', fontSize: 13 }}>* This cannot be undone.</span>

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
      .catch(err => console.log(err))
      .finally(() =>
        setIsLoading(false)
      )

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
        handleClick1={() => setModal((prev) => ({ ...prev, isShow: false }))}
      />
      <div className='bg'></div>
      <LeftMenu />
      <Navbar />
      <div style={{ marginTop: '8vh', marginLeft: '15vw' }} className='section-list-user'>
        <div className="card-left-user card-user">
          <div className="user-img">
            <img className='img-user-my-profile' src={actualUser.img_user} alt="" />
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
                      Full Name:
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
                      Password
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
                    Delete Account
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