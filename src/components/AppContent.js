import React, { Suspense, useLayoutEffect } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

import routes from '../routes'
import { axios } from 'src/utils'
import { notification } from 'antd'

const listPath = routes?.map((item) => item?.path)

const AppContent = () => {
  const location = useLocation()
  const navigate = useNavigate()

  useLayoutEffect(() => {
    const token = window.sessionStorage.getItem('token')

    if (token) {
      axios('https://www.backend.kkprba.com/api/dashboard')
        .then((res) => {
          if (res?.status !== 200) {
            navigate('/login')
          } else {
            if (!listPath?.includes(location.pathname)) {
              navigate('/dashboard')
            }
          }
        })
        .catch(() => {
          navigate('/login')
        })
        .finally(() => {})
    } else {
      navigate('/login')

      notification.error({
        key: 'tokenUndefined',
        message: 'Session Anda telah habis, silahkan Login ulang',
      })
    }
  }, [location?.pathname])

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
