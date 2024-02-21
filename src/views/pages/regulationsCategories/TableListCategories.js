import React from 'react'
import { Space, Table } from 'antd'
import { CButton } from '@coreui/react'

const TableListCategories = ({
  data,
  setModalOpen,
  setDataModal,
  setModalDeleteOpen,
  setIsTypeAdd,
}) => {
  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p>{text}</p>,
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
              setIsTypeAdd(false)
            }}
          >
            Edit
          </CButton>

          <CButton
            size="sm"
            color="danger"
            onClick={() => {
              console.log({ record })
              setModalDeleteOpen(true)
              setDataModal({ id: record?.id, name: record?.name })
            }}
          >
            Delete
          </CButton>
        </Space>
      ),
    },
  ]

  return (
    <div style={{ padding: '10px' }}>
      <Table columns={columns} dataSource={data} scroll={{ y: '500px' }} />
    </div>
  )
}

export default TableListCategories
