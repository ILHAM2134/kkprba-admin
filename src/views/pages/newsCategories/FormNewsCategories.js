import { CCardBody } from '@coreui/react'
import { Form, Input, Modal, notification } from 'antd'
import 'react-quill/dist/quill.snow.css'
import { useEffect } from 'react'
import { axios } from 'src/utils'

const FormNewsCategories = ({
  formNews,
  modalOpen,
  setModalOpen,
  dataModal,
  isTypeAdd,
  setTag,
  setLoadingPage,
}) => {
  useEffect(() => {
    formNews.setFieldValue('name', dataModal?.name)
  }, [dataModal])

  const onFinish = (values) => {
    var bodyFormData = new FormData()

    bodyFormData.append('name', values?.name)

    setLoadingPage(true)

    if (isTypeAdd) {
      axios
        .post('/blog-category', bodyFormData, {
          headers: { 'Content-Type': `multipart/form-data; boundary=${bodyFormData._boundary}` },
        })
        .then(() => {
          notification.success({
            key: 'successCreateNews',
            message: 'Success create Category',
          })
        })
        .catch((error) => error)
        .finally(() => {
          setLoadingPage(false)
          setModalOpen(false)
          setTag('fetch')
        })
    } else {
      axios
        .put(`/blog-category/${dataModal?.id ?? 0}`, bodyFormData, {
          headers: { 'Content-Type': `multipart/form-data; boundary=${bodyFormData._boundary}` },
        })
        .then(() => {
          notification.success({
            key: 'successCreateNews',
            message: 'Success edit Category',
          })
        })
        .catch((error) => error)
        .finally(() => {
          setLoadingPage(false)
          setModalOpen(false)
          setTag('fetch')
        })
    }
  }

  return (
    <Modal
      title={
        <p style={{ marginBottom: '20px', fontSize: '20px', fontWeight: '600px' }}>
          {isTypeAdd ? 'Add New Category' : 'Edit Category'}
        </p>
      }
      open={modalOpen}
      onCancel={() => setModalOpen(false)}
      okText="Save"
      onOk={() => formNews.submit()}
    >
      <CCardBody>
        <Form form={formNews} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Name is required',
              },
              {
                min: 5,
                max: 50,
                message: 'Text must be 5 - 50 characters',
              },
            ]}
          >
            <Input placeholder="Input Name Here" />
          </Form.Item>
        </Form>
      </CCardBody>
    </Modal>
  )
}

export default FormNewsCategories
