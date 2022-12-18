import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import FrontPage from './components/FrontPage'
import Login from './components/Login'
import APISetup from './components/APISetup'
import { FeaturesGrid, MOCKDATA } from './components/FeatureExample'
import { getUserSecrets } from './api/getUserSecrets'

const App = (): JSX.Element => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userSecrets, setUserSecrets] = useState([])

  useEffect(() => {
    getUserSecrets().then((secrets: any) => {
      setUserSecrets(secrets)
      setIsAuthenticated(true)
    })
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<FrontPage />} />
        <Route path='/auth' element={<Login />} />
        <Route
          path="apisetup"
          element={<APISetup title={'Panaceum'} description={''} />}
        />
        <Route
          path="features"
          element={
            <FeaturesGrid title={'Panaceum'} description={''} data={MOCKDATA} />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
