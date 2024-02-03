import { CCardBody } from '@coreui/react'
import { Modal, notification } from 'antd'
import { axios } from 'src/utils'

const ModalConfirmDelete = ({
  modalDeleteOpen,
  setModalDeleteOpen,
  dataModal,
  setLoadingPage,
  setTag,
}) => {
  const handleSubmit = () => {
    setLoadingPage(true)

    axios
      .delete(`/blog-category/${dataModal?.id}`)
      .then((res) => {
        notification.success({
          key: 'successCreateNews',
          message: 'Success delete Category',
        })
      })
      .catch((error) => error)
      .finally(() => {
        setLoadingPage(false)
        setModalDeleteOpen(false)
        setTag('fetch')
      })
  }

  return (
    <Modal
      title={
        <p style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600px' }}>Delete News</p>
      }
      open={modalDeleteOpen}
      onCancel={() => setModalDeleteOpen(false)}
      okText="Delete"
      onOk={handleSubmit}
    >
      <CCardBody>
        <p>
          You are about to delete categories with the name
          <span style={{ color: 'red' }}>
            &nbsp;'
            {dataModal?.name?.length > 15 ? dataModal?.name?.slice(0, 15) + '...' : dataModal?.name}
            &nbsp;'
          </span>
          are you sure?
        </p>
      </CCardBody>
    </Modal>
  )
}

export default ModalConfirmDelete
