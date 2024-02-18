import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import { checkIfTokenIsValid } from 'src/utils'
import { notification } from 'antd'

const AppContent = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const checkToken = async () => {
      const isTokenValid = await checkIfTokenIsValid()

      if (isTokenValid !== 200) {
        notification.error({
          key: 'invalidToken',
          message: 'Sesion anda berakhir, silahkan login ulang',
        })

        navigate('/login')
      }
    }

    setTimeout(() => {
      checkToken()
    }, 10000)
  }, [location])

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={<route.element />}
                />
              )
            )
          })}

          <Route path="/" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
