import React from 'react'
import { Space, Table, Tag } from 'antd'
import { CButton } from '@coreui/react'

const TableListNews = ({
  data,
  setModalOpen,
  setDataModal,
  formNews,
  isTypeAdd,
  setIsTypeAdd,
  totalData,
  setTotalData,
  page,
  setPage,
  pageLimit,
  setPageLimit,
  setImageUrl,
  setImgFile,

  modalDeleteOpen,
  setModalDeleteOpen,
}) => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
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
              <Tag color={color} key={tag?.id} style={{ marginBlock: '5px' }}>
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
              setIsTypeAdd(false)
            }}
          >
            Edit
          </CButton>
          <CButton
            size="sm"
            color="danger"
            style={{ color: 'white' }}
            onClick={() => {
              setModalDeleteOpen(true)
              setDataModal({ id: record?.key, short_title: record?.short_title })
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
      <Table
        columns={columns}
        dataSource={data}
        // pagination={{
        //   total: totalData,
        //   showSizeChanger: true,
        //   pageSizeOptions: ['10', '20', '50'],
        //   current: page,
        //   pageSize: pageLimit,
        // }}
        // onChange={(pagination, filters, sorter, extra) => {
        //   if (extra?.action === 'paginate') {
        //     setPage(pagination?.current)
        //     setPageLimit(pagination?.pageSize)
        //   }
        // }}
        scroll={{ y: '500px' }}
      />
    </div>
  )
}

export default TableListNews
