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

import '../../styles/components/user-list.sass'

import createAxiosInstance from '../../settings/AxiosSettings';
import { Context } from '../../context/AuthContext';

import PersonDefault from '../../img/person.jpg'

// TODO: Change language to pt-br
// TODO: Remove unused libs
// TODO: Remove unused functions / constants

const UsersList = () => {

  const { actualUser } = useContext(Context)
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
        const res = await apiALR.get(`/users/${actualUser.enterprise}/`);
        setRows(res.data)
        setIsLoading(false)

      } catch (error) {
        setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Ocorreu um erro!', textBody: 'Não foi possível carregar os usuários' }))
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
      position: '',
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
    if (user.name && user.email && user.position && user.position != 'default') {

      setIsLoading(true)
      let passAleatorio = generateRandomString(10)
      const formData = new FormData();
      formData.append('name', user.name)
      formData.append('email', user.email)
      formData.append('img_user', user.img_user)
      formData.append('password', passAleatorio)
      formData.append('cargo', user.position)
      formData.append('enterprise', parseInt(actualUser.enterprise))

      await apiALR.post('https://api.alrtcc.com/register/', formData)
        .then(() => {
          setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Sucesso!', textBody: 'Usuário convidado!' }))
        })
        .catch((err) => {
          console.log(err)
          if (err?.response?.data?.message == "Email já cadastrado") {
            setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Ocorreu um erro!', textBody: 'E-mail já existe' }))
          }
        })
        .finally(() => {
          setIsLoading(false)
        })

      await apiALR.get(`https://api.alrtcc.com/users/${actualUser.enterprise}/`)
        .then(res => setRows(res.data))
        .catch((error) => {
          setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Ocorreu um erro!', textBody: 'Não foi possível carregar os usuários' }))
        })
    } else {
      setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Não foi possível!', textBody: 'Campos vazios!' }))
    }
  }

  const handleFileChange = async (e) => {
    const photo = e.target.files[0]
    setUser(prev => ({ ...prev, img_user: photo }))
  }

  const handleDeleteUser = async (id) => {
    setIsLoading(true)
    await apiALR.delete('https://api.alrtcc.com/user/' + id)
      .then(() => setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Sucesso!', textBody: 'Deletado!' })))
      .catch(() => setModal((prev) => ({ ...prev, isShow: true, textTitle: 'Ocorreu em erro!', textBody: 'Não foi possível deletar o usuário.' })))
      .finally(() =>
        setIsLoading(false)
      )
    const res = await apiALR.get(`https://api.alrtcc.com/users/${actualUser.enterprise}/`);
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
        <TableContainer style={{ marginTop: '8vh', marginLeft: '15vw' }} component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Imagem</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">E-mail</TableCell>
                <TableCell align="center">Cargo</TableCell>
                <TableCell align="center">Status</TableCell>
                {actualUser.cargo == 'Administrador' && <TableCell align="center">Ações</TableCell>}

              </TableRow>
            </TableHead>
            <TableBody>

              {actualUser.cargo == 'Administrador' &&

                <TableRow
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center"><input onChange={handleFileChange} type="file" accept='image/*' className='form-control' /></TableCell>
                  <TableCell><input maxLength={22} value={user.name} onChange={handleChange} name='name' className='form-control text-center' type="text" /></TableCell>
                  <TableCell align="center"><input onChange={handleChange} value={user.email} name='email' className='form-control text-center' type="text" /></TableCell>
                  <TableCell align="center">
                    <select onChange={handleChange} value={user.position} className='form-select' name="position" id="position">
                      <option value="default">Selecione um cargo</option>
                      <option value="Colaborador">Colaborador</option>
                      <option value="Administrador">Administrador</option>
                    </select>
                  </TableCell>
                  <TableCell align="center">--</TableCell>
                  <TableCell align="center"><button onClick={handleAddUser} className='btn btn-primary'>Add +</button></TableCell>
                </TableRow>}

              {rows.slice().reverse()?.map((row) => {
                return (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align='center'>

                      {
                        row.img_user ? 
                        <img className='user-img-table' src={row.img_user} alt="" />
                          :
                        <img className='user-img-table' src={PersonDefault} alt="" />
                      }
                    </TableCell>
                    <TableCell align="center">
                      {row.name}
                    </TableCell>

                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.cargo}</TableCell>
                    <TableCell align="center">
                      {row.status == false ? <LiaClockSolid fontSize={20} title='Convidado' color='orange' /> : <AiOutlineCheck fontSize={20} title='Aceito' color='green' />}
                    </TableCell>
                    {(row.id != actualUser.id && !row.teenant) && <TableCell align="center"><TrashIcon uuid={row.id} handleClick={() => handleDeleteUser(row.id)} /></TableCell>}
                  </TableRow>
                )
              }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )
}

export default UsersList