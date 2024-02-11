import { notification } from 'antd'
import Axios from 'axios'

const IS_BROWSER = typeof window !== 'undefined'

export const axios = Axios.create({
  // if axios is called client side add /api to make Next's rewrites work
  // if axios is called server side then call API directly
    // ...(IS_SERVER ? { baseURL: process.env.REACT_APP_API } : { baseURL: '/api' }),
  baseURL: process.env.NODE_ENV === 'production' ? 'https://backend.kkprba.com/api' : process.env.REACT_APPS_URL_DEV ,
  timeout: Number(process.env.REACT_APP_TIMEOUT),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

const getShownMessage = (error) => {
  notification.destroy('error')

  if (error?.response?.status === 401) {
    return {
      message: 'Unauthorized',
    }
  } else if (error.response?.status >= 500 && error?.response?.data.message) {
    return {
      message: error?.response?.data.message,
    }
  } else if (error.response?.status >= 500) {
    return {
      message: 'Internal Server Error',
    }
  } else if (typeof error?.response?.data === 'object') {
    return {
      message: error?.response?.data.message,
    }
  } else if (typeof error?.response?.data === 'string') {
    return {
      message: error?.response?.data,
    }
  } else if (error.response?.data?.message === 'Wrong password.') {
    return {
      message: 'Kata Sandi Salah',
    }
  } else if (error.response?.data?.message === 'User not found.') {
    return {
      message: 'NIK-MTN tidak terdaftar',
    }
  } else if (error.response?.data?.message === 'Email not match for the record.') {
    return {
      message: 'Email tidak terdaftar',
    }
  } else {
    return {
      message: error?.response?.data.message,
    }
  }
}

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    if (!error?.response) {
      notification.destroy('error')
      return notification.error({
        message: 'Something went wrong',
        description: 'Check your network connection',
        key: 'error',
      })
    }

    if (error?.code === 'ECONNABORTED') {
      notification.destroy('error')
      return notification.error({
        message: 'Server Timeout',
        key: 'error',
      })
    }

    // TODO: Remove when response "has_revision" is correctly after applying for leave
    if (error?.response?.data?.message === 'No revision found for this timeoff.') {
      return
    }

    // if error happens on server side then log the error on FE server
    // if error happens on client side then show notification
    if (IS_BROWSER) {
      if (error?.response?.status !== 403 && error?.response?.status !== 401) {
        notification.error({
          message: getShownMessage(error)?.message,
          description: getShownMessage(error)?.description,
          key: 'error',
        })
      }
    }

    return Promise.reject(error)
  },
)

export const checkIfTokenIsValid = async () => {
  try {
    const res = await axios('https://www.backend.kkprba.com/api/blog')

    const status = await res.status

    return status
  } catch (e) {
    console.log({ e })
  }
}
