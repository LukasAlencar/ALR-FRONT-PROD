import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Navbar'
import LeftMenu from '../LeftMenu'
// COMPONENTS { Table }

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// ICONS

import { LiaClockSolid } from 'react-icons/lia'
import { AiOutlineCheck } from 'react-icons/ai'

// COMPONENTS

import TrashIcon from '../TrashIcon'
import CircularProgress from '@mui/material/CircularProgress';
import ModalPattern from '../ModalPattern'

//

import '../../styles/components/user-list.sass'

import createAxiosInstance from '../../settings/AxiosSettings';
import { Context } from '../../context/AuthContext';



// const getApi = async () =>{
//   await axios.get('https://api.alrtcc.com/users/?format=json')
//     .then(res => {
//       console.log(res);
//     })
//     .catch(err => console.log(err))
//     .finally(() => {
//     })
// }

const UsersList = () => {

  const { token, actualUser } = useContext(Context)
  const apiALR = createAxiosInstance(actualUser.key)

  const [modal, setModal] = useState({
    isShow: false,
    textTitle: '',
    textBody: '',
  })

  useEffect(() => {
    async function getUsers() {
      try {
        setIsLoading(true)
        const res = await apiALR.get('/users/');
        setRows(res.data)
        setIsLoading(false)

      } catch (error) {
        console.log(error)
        setIsLoading(false)

      }
      setIsLoading(false)
    }

    getUsers()
  }, [])

  const [isLoading, setIsLoading] = useState(false)

  const [user, setUser] = useState(
    {
      name: '',
      email: '',
      img_user: 'https://fakeimg.pl/300/',
    }
  )

  const [rows, setRows] = useState([])

  function generateRandomString(length) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    return result;
  }

  const handleAddUser = async () => {
    setIsLoading(true)
    let passAleatorio = generateRandomString(10)
    const formData = new FormData();
    formData.append('name', user.name)
    formData.append('email', user.email)
    formData.append('img_user', user.img_user)
    formData.append('password', passAleatorio)
    formData.append('cargo', 'Colaborador')

    await apiALR.post('https://api.alrtcc.com/register/', formData)
      .then(res => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false)
      })

    const res = await apiALR.get('https://api.alrtcc.com/users/?format=json');
    setRows(res.data)
  }

  const handleFileChange = async (e) => {
    const photo = e.target.files[0]
    setUser(prev => ({ ...prev, img_user: photo }))
  }

  const handleDeleteUser = async (id) => {
    setIsLoading(true)
    await apiALR.delete('https://api.alrtcc.com/user/' + id)
      .then(() => setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Success!', textBody: 'Deleted!' })))
      .catch(err => console.log(err))
      .finally(() =>
        setIsLoading(false)
      )
    const res = await apiALR.get('https://api.alrtcc.com/users/?format=json');
    setRows(res.data)

  }
  const handleChange = (e) => {
    let { value, name } = e.target

    setUser((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <>
      <ModalPattern
        toggleModal={() => setModal((prev) => ({ ...prev, isShow: false }))}
        open={modal.isShow}
        textTitle={modal.textTitle}
        textBody={modal.textBody}
        textBtn1={'Ok'}
        handleClick1={() => setModal((prev) => ({ ...prev, isShow: false }))}
      />
      {isLoading && <>
        <div className='mask' />
        <CircularProgress className='progress-rol' />
      </>
      }
      <Navbar />
      <div className='d-flex flex-1'>
        <LeftMenu />
        {/* <div className='flex-1 d-flex justify-content-center align-items-center'>
          <div className='fields-add-user'>
            <div className="form-group">
              <label className='text-center w-100 mb-1' htmlFor="emailUser">Email</label>
              <input type="text" id='emailUser' className="form-control input-email-add-user mb-2" />
            </div>
            <button className="btn btn-primary w-100">Invite User</button>
          </div>
        </div> */}

        <TableContainer style={{ marginTop: '8vh', marginLeft: '15vw' }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">E-mail</TableCell>
                <TableCell align="center">Status</TableCell>
                {actualUser.cargo == 'Administrador' && <TableCell align="center">Actions</TableCell>}

              </TableRow>
            </TableHead>
            <TableBody>

              {actualUser.cargo == 'Administrador' &&

                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center"><input onChange={handleFileChange} type="file" accept='image/jpeg, image/png' className='form-control' /></TableCell>
                  <TableCell><input maxLength={22} value={user.name} onChange={handleChange} name='name' className='form-control text-center' type="text" /></TableCell>
                  <TableCell align="center"><input onChange={handleChange} value={user.email} name='email' className='form-control text-center' type="text" /></TableCell>
                  <TableCell align="center">--</TableCell>
                  <TableCell align="center"><button onClick={handleAddUser} className='btn btn-primary'>Add +</button></TableCell>
                </TableRow>}

              {rows.slice().reverse()?.map((row) => {

                return (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align='center'><img className='user-img-table' src={row.img_user} alt="" /></TableCell>
                    <TableCell align="center">
                      {row.name}
                    </TableCell>

                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">
                      {row.status == false ? <LiaClockSolid fontSize={20} title='Invited' color='orange' /> : <AiOutlineCheck fontSize={20} title='Accepted' color='green' />}
                    </TableCell>
                    {actualUser.cargo == 'Administrador' == true && <TableCell align="center"><TrashIcon uuid={row.id} handleClick={() => handleDeleteUser(row.id)} /></TableCell>}
                  </TableRow>
                )
              }

              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* <Footer /> */}
    </>
  )
}

export default UsersList