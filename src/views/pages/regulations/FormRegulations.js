import { CCardBody } from '@coreui/react'
import { Form, Input, Select, Upload, Modal, notification } from 'antd'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect } from 'react'
import { axios } from 'src/utils'

const FormNews = ({
  formNews,
  modules,
  uploadButton,
  imageUrl,
  beforeUpload,
  handleChange,
  modalOpen,
  setModalOpen,
  dataModal,
  isTypeAdd,
  dataCategories,
  setImageUrl,
  setLoadingPage,
  imgFile,
  setTag,
  dataTable,
}) => {
  useEffect(() => {
    formNews.setFieldValue('title', dataModal?.title)
    formNews.setFieldValue('short_title', dataModal?.short_title)
    formNews.setFieldValue('description', dataModal?.description)
    formNews.setFieldValue('is_carousel', dataModal?.is_carousel)
    formNews.setFieldValue(
      'categories',
      dataModal?.categories?.map((item) => item?.id),
    )
    formNews.setFieldValue('title', dataModal?.title)
    setImageUrl(dataModal?.image)
  }, [dataModal, dataTable])

  const onFinish = (values) => {
    var bodyFormData = new FormData()

    bodyFormData.append('title', values?.title)
    bodyFormData.append('short_title', values?.short_title)
    bodyFormData.append('description', values?.description)
    bodyFormData.append('is_carousel', values?.is_carousel ? 1 : 0)
    bodyFormData.append('categories', values?.categories?.join(','))
    if (imgFile) {
      bodyFormData.append('image', imgFile)
    }

    setLoadingPage(true)

    if (isTypeAdd) {
      axios
        .post('/regulation', bodyFormData, {
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
      bodyFormData.append('_method', 'PUT')
      axios
        .post(`/regulation/${dataModal?.key ?? 0}`, bodyFormData, {
          headers: { 'Content-Type': `multipart/form-data; boundary=${bodyFormData._boundary}` },
        })
        .then(() => {
          notification.success({
            key: 'successCreateNews',
            message: 'Success Edit Regulation',
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
          {isTypeAdd ? 'Tambah Data' : 'Edit Data'}
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
            name="title"
            label="Title"
            rules={[
              {
                required: true,
                message: 'Title is required',
              },
              {
                min: 5,
                max: 50,
                message: 'Text must be 5 - 50 characters',
              },
            ]}
          >
            <Input placeholder="Input Title Here" />
          </Form.Item>

          <Form.Item
            name="short_title"
            label="Short Title"
            rules={[
              {
                required: true,
                message: 'Short title is required',
              },
              {
                min: 5,
                max: 20,
                message: 'Text must be 5 - 20 characters',
              },
            ]}
          >
            <Input placeholder="Input Short Title Here" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <ReactQuill
              placeholder="Input Description Here"
              theme="snow"
              modules={modules}
              onChange={() => {}}
            />
          </Form.Item>

          <Form.Item
            name="categories"
            label="Categories"
            rules={[
              {
                required: true,
                message: 'Title is required',
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Select Categories here"
              options={dataCategories?.map((item) => ({ value: item?.id, label: item?.name }))}
            />
          </Form.Item>

          <Form.Item
            name="image"
            label="Image"
            valuePropName="file"
            rules={[
              {
                required: isTypeAdd,
                message: 'Image is required',
              },
            ]}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              // action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              beforeUpload={beforeUpload}
              onChange={handleChange}
              accept="image/*"
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="avatar"
                  style={{
                    width: '100px',
                    maxHeight: '100px',
                    display: 'block',
                  }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
        </Form>
      </CCardBody>
    </Modal>
  )
}

export default FormNews
