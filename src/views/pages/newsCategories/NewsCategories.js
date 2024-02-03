'use client'
import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardHeader } from '@coreui/react'

import { Form, Spin } from 'antd'
import { axios } from 'src/utils'
import TableListCategories from './TableListCategories'
import ModalConfirmDelete from './ModalConfirmDelete'
import FormNewsCategories from './FormNewsCategories'

const NewsCategories = () => {
  const [formNews] = Form.useForm()
  const [loadingPage, setLoadingPage] = useState(false)

  const [dataTable, setDataTable] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [dataModal, setDataModal] = useState({})

  const [modalDeleteOpen, setModalDeleteOpen] = useState(false)

  const [dataCategories, setDataCategories] = useState([])
  const [isTypeAdd, setIsTypeAdd] = useState(true)

  const [tag, setTag] = useState('fetch')

  const [totalData, setTotalData] = useState(0)
  const [page, setPage] = useState(1)
  const [pageLimit, setPageLimit] = useState(10)

  useEffect(() => {
    if (tag === 'fetch') {
      setLoadingPage(true)

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
            <p style={{ fontSize: '20px', marginBlock: 'auto' }}>Categories List (News)</p>

            <CButton
              size="sm"
              onClick={() => {
                setModalOpen(true)
                formNews.resetFields()
                setIsTypeAdd(true)
              }}
            >
              Add New Categories (News)
            </CButton>
          </CCardHeader>

          <TableListCategories
            data={dataCategories}
            setModalOpen={setModalOpen}
            setDataModal={setDataModal}
            formNews={formNews}
            isTypeAdd={isTypeAdd}
            setIsTypeAdd={setIsTypeAdd}
            setModalDeleteOpen={setModalDeleteOpen}
          />

          <FormNewsCategories
            formNews={formNews}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            dataModal={dataModal}
            isTypeAdd={isTypeAdd}
            dataCategories={dataCategories}
            setTag={setTag}
            setLoadingPage={setLoadingPage}
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

export default NewsCategories
