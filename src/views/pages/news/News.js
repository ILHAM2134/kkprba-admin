'use client'
import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardHeader } from '@coreui/react'

import { Form, Spin, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { axios } from 'src/utils'
import FormNews from './FormNews'
import TableListNews from './TableListNews'
import ModalConfirmDelete from './ModalConfirmDelete'

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

const News = () => {
  const [formNews] = Form.useForm()
  const [loadingPage, setLoadingPage] = useState(false)
  const [loading, setLoading] = useState(false)

  const [dataTable, setDataTable] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [dataModal, setDataModal] = useState({})

  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)

  const [dataCategories, setDataCategories] = useState([])
  const [isTypeAdd, setIsTypeAdd] = useState(true)

  const [imageUrl, setImageUrl] = useState('')
  const [imgFile, setImgFile] = useState('')
  const [tag, setTag] = useState('fetch')

  const [totalData, setTotalData] = useState(0)
  const [page, setPage] = useState(1)
  const [pageLimit, setPageLimit] = useState(10)

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }

    setImgFile(file)
    return isJpgOrPng
  }

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
    if (tag === 'fetch') {
      setLoadingPage(true)

      axios('/api/blog')
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
          setTag('')
        })
    }
  }, [tag])

  return (
    <>
      <Spin spinning={loadingPage}>
        <CCard className="mb-4">
          <CCardHeader
            style={{
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBlock: '12px',
            }}
          >
            <p style={{ fontSize: '20px', marginBlock: 'auto' }}>News List</p>

            <CButton
              size="sm"
              onClick={() => {
                setModalOpen(true)
                formNews.resetFields()
                setIsTypeAdd(true)
                setImageUrl('')
                setImgFile('')
              }}
            >
              Add News Lists
            </CButton>
          </CCardHeader>

          <TableListNews
            data={dataTable}
            setModalOpen={setModalOpen}
            setDataModal={setDataModal}
            formNews={formNews}
            setIsTypeAdd={setIsTypeAdd}
            isTypeAdd={isTypeAdd}
            totalData={totalData}
            setTotalData={setTotalData}
            page={page}
            setPage={setPage}
            pageLimit={pageLimit}
            setPageLimit={setPageLimit}
            setImageUrl={setImageUrl}
            setImgFile={setImgFile}
            modalDeleteOpen={modalDeleteOpen}
            setModalDeleteOpen={setModalDeleteOpen}
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
            isTypeAdd={isTypeAdd}
            dataCategories={dataCategories}
            setImageUrl={setImageUrl}
            setLoadingPage={setLoadingPage}
            imgFile={imgFile}
            setTag={setTag}
          />
        </CCard>
      </Spin>

      <ModalConfirmDelete
        modalDeleteOpen={modalDeleteOpen}
        setModalDeleteOpen={setModalDeleteOpen}
        dataModal={dataModal}
        setLoadingPage={setLoadingPage}
        setTag={setTag}
      />
    </>
  )
}

export default News
