import { cilInbox } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCardBody, CCardHeader, CCardFooter, CButton } from '@coreui/react'
import { Form, Input, Checkbox, Select, Upload, Modal } from 'antd'
import ReactQuill from 'react-quill'
import { DocsLink } from 'src/components'
import 'react-quill/dist/quill.snow.css'
import { useEffect } from 'react'

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
}) => {
  useEffect(() => {
    formNews.setFieldValue('title', dataModal?.title)
    formNews.setFieldValue('short_title', dataModal?.short_title)
    formNews.setFieldValue('description', dataModal?.description)
    formNews.setFieldValue('is_carousel', dataModal?.is_carousel)
    formNews.setFieldValue('categories', dataModal?.categories)
    formNews.setFieldValue('title', dataModal?.title)
  }, [dataModal])

  const onFinish = (values) => {}

  return (
    <Modal open={modalOpen} onCancel={() => setModalOpen(false)} okText="Save">
      <CCardBody>
        <Form form={formNews} layout="vertical" onFinish={onFinish}>
          <Form.Item name="title" label="Title">
            <Input placeholder="Input Title Here" />
          </Form.Item>

          <Form.Item name="short_title" label="Short Title">
            <Input placeholder="Input Short Title Here" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <ReactQuill
              placeholder="Input Description Here"
              theme="snow"
              modules={modules}
              onChange={(e) => console.log(e)}
            />
          </Form.Item>

          <Form.Item name="is_carousel" label="Carousel" valuePropName="checked">
            <Checkbox>Check if your news includes in carousel</Checkbox>
          </Form.Item>

          <Form.Item name="categories" label="Categories">
            <Select
              mode="multiple"
              placeholder="Select Categories here"
              options={[
                { value: 1, label: 'categories 1' },
                { value: 2, label: 'categories 2' },
                { value: 3, label: 'categories 3' },
              ]}
            />
          </Form.Item>

          <Form.Item name="image" label="Image">
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
