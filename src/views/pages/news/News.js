'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { CCard, CCardHeader, CCardBody, CCardFooter, CButton } from '@coreui/react'
import { DocsLink } from 'src/components'

import { Checkbox, Form, Input, Select, Spin, Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import CIcon from '@coreui/icons-react'
import { cilInbox } from '@coreui/icons'
import { axios } from 'src/utils'
import FormNews from './FormNews'
import TableListNews from './TableListNews'
import TableListCategories from './TableListCategories'

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
}

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  return isJpgOrPng
}

const News = () => {
  const [formNews] = Form.useForm()
  const [formCategories] = Form.useForm()
  const [loadingPage, setLoadingPage] = useState(false)
  const [loading, setLoading] = useState(false)

  const [dataTable, setDataTable] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [dataModal, setDataModal] = useState({})

  const [dataCategories, setDataCategories] = useState([])
  const [modalCategoriesOpen, setModalCategoriesOpen] = useState(false)

  const [imageUrl, setImageUrl] = useState()

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }

    getBase64(info.file.originFileObj, (url) => {
      setLoading(false)
      setImageUrl(url)
    })
  }
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  )

  useEffect(() => {
    setLoadingPage(true)

    axios('/blog')
      .then((res) => {
        const data = res?.data?.data?.map((item) => ({
          key: item?.id,
          title: item?.title,
          short_title: item?.short_title,
          is_carousel: item?.is_carousel,
          description: item?.description,
          image: item?.image,
          categories: item?.categories,
        }))

        setDataTable(data || [])
      })
      .catch((error) => {})
      .finally(() => {
        setLoadingPage(false)
      })

    axios('/blog-category')
      .then((res) => {
        if (res.status === 200) {
          setDataCategories(res?.data?.data || [])
        }
      })
      .catch((error) => {})
      .finally(() => {
        setLoadingPage(false)
      })
  }, [])

  return (
    <Spin spinning={loadingPage}>
      <CCard className="mb-4">
        <CCardHeader style={{ marginBottom: '10px' }}>News List</CCardHeader>

        <TableListNews
          data={dataTable}
          setModalOpen={setModalOpen}
          setDataModal={setDataModal}
          formNews={formNews}
        />

        <FormNews
          formNews={formNews}
          modules={modules}
          uploadButton={uploadButton}
          imageUrl={imageUrl}
          beforeUpload={beforeUpload}
          handleChange={handleChange}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          dataModal={dataModal}
        />
      </CCard>

      <CCard className="mb-4">
        <CCardHeader style={{ marginBottom: '10px' }}>Categories List</CCardHeader>

        <TableListCategories
          data={dataCategories}
          setModalOpen={setModalOpen}
          setDataModal={setDataModal}
          formNews={formNews}
        />
      </CCard>
    </Spin>
  )
}

export default News
