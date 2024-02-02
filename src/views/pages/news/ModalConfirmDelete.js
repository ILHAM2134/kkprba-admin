import { CCardBody } from '@coreui/react'
import { Modal, notification } from 'antd'
import { axios } from 'src/utils'

const ModalConfirmDelete = ({ modalOpen, setModalOpen, dataModal, setLoadingPage, setTag }) => {
  const handleSubmit = () => {
    setLoadingPage(true)

    axios
      .post('/blog', bodyFormData, {
        headers: { 'Content-Type': `multipart/form-data; boundary=${bodyFormData._boundary}` },
      })
      .then((res) => {
        notification.success({
          key: 'successCreateNews',
          message: 'Success create news',
        })
      })
      .catch((error) => error)
      .finally(() => {
        setLoadingPage(false)
        setModalOpen(false)
        setTag('fetch')
      })
  }

  return (
    <Modal
      title={
        <p style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600px' }}>Delete News</p>
      }
      open={modalOpen}
      onCancel={() => setModalOpen(false)}
      okText="Delete"
      onOk={handleSubmit}
    >
      <CCardBody>
        <p>You are about to delete news with the title ... are you sure?</p>
      </CCardBody>
    </Modal>
  )
}

export default ModalConfirmDelete
