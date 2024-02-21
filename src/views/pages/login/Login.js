import React, { useLayoutEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CRow } from '@coreui/react'
import { Form, Input, Spin, notification } from 'antd'
import { axios } from 'src/utils'

import loginIllustration from '../../../assets/images/login-illustration.jpg'
import routes from 'src/routes'

const listPath = routes?.map((item) => item?.path)

const Login = () => {
  const [form] = Form.useForm()

  const location = useLocation()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const onFinish = (values) => {
    const { username, password } = values

    setLoading(true)

    axios
      .post('/login', {
        username,
        password,
      })
      .then((res) => {
        if (res?.status === 200) {
          window.sessionStorage.setItem('token', res?.data?.data?.token)
          window.sessionStorage.setItem('expires_in', res?.data?.data?.expires_in)

          window.sessionStorage.setItem('name', res?.data?.data?.user?.name)
          window.sessionStorage.setItem('username', res?.data?.data?.user?.username)

          navigate('/')

          notification.success({
            key: 'loginSuccess',
            message: 'Log in berhasil!',
          })
        }
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
      })
  }

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
        .catch(() => {})
        .finally(() => {})
    } else {
      notification.error({
        key: 'tokenUndefined',
        message: 'Session Anda telah habis, silahkan Login ulang',
      })
    }
  }, [])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <Spin spinning={loading}>
              <CCardGroup>
                <CCard style={{ border: 'none' }}>
                  <CCardBody
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CForm style={{ width: '100%', paddingLeft: '20px' }}>
                      <h1>Login</h1>

                      <p className="text-medium-emphasis">Sign In to your account</p>

                      <Form form={form} layout="vertical" onFinish={onFinish}>
                        <Form.Item
                          name="username"
                          rules={[
                            {
                              required: true,
                              message: 'Username wajib diisi',
                            },
                          ]}
                        >
                          <Input placeholder="Username" />
                        </Form.Item>

                        <Form.Item
                          name="password"
                          rules={[{ required: true, message: 'Password wajib diisi' }]}
                        >
                          <Input.Password placeholder="Password" />
                        </Form.Item>

                        <CRow>
                          <CCol xs={6}>
                            <CButton
                              color="primary"
                              className="px-4"
                              onClick={() => {
                                form.submit()
                              }}
                            >
                              Login
                            </CButton>
                          </CCol>

                          <CCol xs={6} className="text-right">
                            <CButton color="link" className="px-0">
                              Forgot password?
                            </CButton>
                          </CCol>
                        </CRow>
                      </Form>
                    </CForm>
                  </CCardBody>
                </CCard>

                <CCard
                  className="text-white py-5 md:hidden under-600px-none"
                  style={{ width: '44%', border: 'none' }}
                >
                  <CCardBody className="text-center">
                    <img
                      src={loginIllustration}
                      alt="login illustration"
                      style={{ width: '100%' }}
                    />
                  </CCardBody>
                </CCard>
              </CCardGroup>
            </Spin>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
