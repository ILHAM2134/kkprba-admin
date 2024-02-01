import React from 'react'
import { Space, Table, Tag } from 'antd'
import { CButton } from '@coreui/react'

const TableListCategories = ({ data, setModalOpen, setDataModal, formNews }) => {
  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <CButton
            size="sm"
            onClick={() => {
              setModalOpen(true)
              setDataModal(record)
            }}
          >
            Edit
          </CButton>
          <CButton size="sm" color="danger">
            Delete
          </CButton>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ padding: '10px' }}>
      <Table
        columns={columns}
        dataSource={data}
        footer={(e) => {
          return (
            <CButton
              size="sm"
              onClick={() => {
                setModalOpen(true)
                formNews.resetFields()
              }}
            >
              Tambah Categories Baru
            </CButton>
          )
        }}
        scroll={{ y: '500px' }}
      />
    </div>
  )
}

export default TableListCategories
