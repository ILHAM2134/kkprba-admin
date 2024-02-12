import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CRow } from '@coreui/react'
import { useDispatch } from 'react-redux'
import { Form, Input, Spin, notification } from 'antd'
import { axios } from 'src/utils'
// import cookie from "js-cookie";

const Login = () => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [status, setStatus] = useState(0)

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
          setStatus(res?.status)

          console.log(res?.data?.data?.token)
          console.log(res?.data?.data?.expires_in)
          // cookie.set("token", res?.data?.data?.token, { path: "/", sameSite: "lax", expires: 3600, secure: true, httpOnly: true });
          
          dispatch({
            type: 'set',
            dataUser: {
              name: res?.data?.data?.user?.name,
              username: res?.data?.data?.user?.username,
            },
          })

          notification.success({
            key: 'loginSuccess',
            message: 'Log in berhasil!',
          })
        }
      })
      .catch((error) => {})
      .finally(() => {
        setLoading(false)
      })
  }

  if (status === 200) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <Spin spinning={loading}>
              <CCardGroup>
                <CCard className="p-4">
                  <CCardBody>
                    <CForm>
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

                <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                  <CCardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>

                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>

                      <Link to="/login">
                        <CButton color="primary" className="mt-3" active tabIndex={-1}>
                          Register Now!
                        </CButton>
                      </Link>
                    </div>
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
