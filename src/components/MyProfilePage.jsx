import React, { useContext } from 'react'
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

function MyProfilePage() {
  const { actualUser, token, getApi } = useContext(Context)
  const apiALR = createAxiosInstance(actualUser.key)

  const calcFontSize = () => {
    const fontSize = Math.max(15, Math.min(25, 35 - actualUser.name.length));
    return fontSize;
  };

  const handleEditName = async (data) => {
    let formData = new FormData();
    formData.append('name', data.input);
    apiALR.put(`/user/${actualUser.id}/`, formData)
    .then((res) => {
      console.log(res)
      getApi()
    })
    .catch((err) => {console.log(err)})
  }
  const handleEditPassword = (data) => {
    let formData = new FormData();
    formData.append('password', data.input);
    apiALR.put(`/user/${actualUser.id}/`, formData)
    .then((res) => {
      console.log(res)
      getApi()
    })
    .catch((err) => {console.log(err)})
  }
  return (
    <>
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
          </List>
        </div>
      </div>
    </>
  )
}

export default MyProfilePage