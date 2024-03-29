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
    var bodyFormData = {
      name: values?.name,
    }

    setLoadingPage(true)

    if (isTypeAdd) {
      axios
        .post('/regulation-category', bodyFormData, {
          headers: { 'Content-Type': `multipart/form-data; boundary=${bodyFormData._boundary}` },
        })
        .then(() => {
          notification.success({
            key: 'successCreateNews',
            message: 'Success create Regulation',
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
        .put(`/regulation-category/${dataModal?.id ?? 0}`, bodyFormData)
        .then(() => {
          notification.success({
            key: 'successCreateNews',
            message: 'Success edit Regulation',
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
                max: 20,
                message: 'Text must be 5 - 20 characters',
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
