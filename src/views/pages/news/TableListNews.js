import React from 'react'
import { Space, Table, Tag } from 'antd'
import { CButton } from '@coreui/react'

const TableListNews = ({ data, setModalOpen, setDataModal, formNews }) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Short Title',
      dataIndex: 'short_title',
      key: 'short_title',
    },
    {
      title: 'Is Carousel',
      dataIndex: 'is_carousel',
      key: 'is_carousel',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Categories',
      key: 'categories',
      dataIndex: 'categories',
      render: (_, { categories }) => (
        <>
          {categories?.map((tag) => {
            let color = tag?.name?.length > 5 ? 'geekblue' : 'green'
            if (tag?.name === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag?.id}>
                {tag?.name?.toUpperCase()}
              </Tag>
            )
          })}
        </>
      ),
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
              Tambah Data Baru
            </CButton>
          )
        }}
        scroll={{ y: '500px' }}
      />
    </div>
  )
}

export default TableListNews
