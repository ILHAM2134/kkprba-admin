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
      .delete(`/regulation/${dataModal?.id}`)
      .then((res) => {
        notification.success({
          key: 'successCreateNews',
          message: 'Success delete Regulation',
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
          You are about to delete news with the title
          <span style={{ color: 'red' }}>
            &nbsp;'
            {dataModal?.short_title?.length > 15
              ? dataModal?.short_title?.slice(0, 15) + '...'
              : dataModal?.short_title}
            &nbsp;'
          </span>
          are you sure?
        </p>
      </CCardBody>
    </Modal>
  )
}

export default ModalConfirmDelete
