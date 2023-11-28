import { useContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import PageHome from './components/PageHome'
import PageCalc from './components/PageCalc'
import PageDashboard from './components/PageDashboard'
import ReportPage from './components/ReportPage'
import MyProfilePage from './components/MyProfilePage'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import PageRegister from './components/PageRegister'
import { AnimatePresence, useReducedMotion } from 'framer-motion'
import PageLogin from './components/PageLogin'
import CreateContracts from './components/pages/CreateContracts'
import EditContracts from './components/pages/EditContracts'
import UsersList from './components/pages/UsersList'
import { AuthProvider, Context } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import CostCenter from './components/pages/CostCenter'
import ViewEnterprise from './components/pages/ViewEnterprise'
import ChangePasswordDynamic from './components/pages/ChangePasswordDynamic/ChangePasswordDynamic'
import LicensingRules from './components/pages/LicensingRules/LicensingRules'
import Owners from './components/pages/Owners/Owners'
import NotFound from './components/pages/NotFound/NotFound'

function App() {

  const navigate = useNavigate()

  // const [credentials, setCredentials] = useState(null)
  // useEffect(()=>{
  //   setCredentials(localStorage.getItem('token'))
  //   if(localStorage.getItem('token')){
  //     navigate('/home')
  //   }

  // },[])

  return (
    <AnimatePresence mode='wait'>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PageLogin />} /> {/* Maped */}
          <Route path="/register" element={<PageRegister />} /> {/* Maped */}
          {/* <Route path="/home" element={<PageHome />} />  Maped */}
          <Route path="/calculator" element={
            <PrivateRoute>
              <PageCalc /> {/* Maped */}
            </PrivateRoute>} />

          <Route path="/dashboards" element={
            <PrivateRoute>
              <PageDashboard /> {/* Maped */}
            </PrivateRoute>} />

          <Route path="/my-profile" element={
            <PrivateRoute>
              <MyProfilePage /> {/* Maped */}
            </PrivateRoute>} />

          <Route path="/reports" element={
            <PrivateRoute>
              <ReportPage /> {/* Maped */}
            </PrivateRoute>}></Route>

          <Route path="/create-contract" element={
            <PrivateRoute>
              <CreateContracts /> {/* Maped */}
            </PrivateRoute>}></Route>

          <Route path="/edit-contract" element={
            <PrivateRoute>
              <EditContracts /> {/* Maped */}
            </PrivateRoute>}></Route>

          <Route path="/view-enterprise" element={
            <PrivateRoute>
              <ViewEnterprise />
            </PrivateRoute>}></Route>

          <Route path="/invite-users" element={
            <PrivateRoute>
              <ReportPage />
            </PrivateRoute>}></Route>

          <Route path="/users-list" element={
            <PrivateRoute>
              <UsersList /> {/* Maped */}
            </PrivateRoute>}></Route>

          <Route path="/create-cost-center" element={
            <PrivateRoute>
              <CostCenter />
            </PrivateRoute>}></Route>

          <Route path="/edit-cost-center" element={
            <PrivateRoute>
              <ReportPage />
            </PrivateRoute>}></Route>

          <Route path={`/change-password/:token`} caseSensitive={true} element={<ChangePasswordDynamic />}></Route>

          <Route path="/view-owners" element={
            <PrivateRoute>
              <Owners />
            </PrivateRoute>}></Route>

          <Route path="/view-licensing-rules" element={
            <PrivateRoute>
              <LicensingRules />
            </PrivateRoute>}></Route>

          <Route path="/home" element={
            <PrivateRoute>
              <PageHome />
            </PrivateRoute>} />

            <Route path="*" element={<NotFound />} /> {/* Maped */}
        </Routes>
      </AuthProvider>
    </AnimatePresence>
  )
}

export default App
