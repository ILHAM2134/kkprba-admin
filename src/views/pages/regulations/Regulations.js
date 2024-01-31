import React, { useState } from 'react'
import { CCard, CCardHeader, CCardBody, CCardFooter, CButton } from '@coreui/react'
import { DocsLink } from 'src/components'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Checkbox, Form, Input, Select, Upload, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import CIcon from '@coreui/icons-react'
import { cilInbox } from '@coreui/icons'

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
}

const getBase64 = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  return isJpgOrPng
}

const Regulations = () => {
  const [formNews] = Form.useForm()
  const [formCategories] = Form.useForm()

  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()

  const handleChange = (info) => {
    console.log({ info })
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }

    getBase64(info.file.originFileObj, (url) => {
      setLoading(false)
      setImageUrl(url)
    })
  }
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  )

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          Regulations Form
          <DocsLink href="https://coreui.io/docs/content/typography/" />
        </CCardHeader>

        <CCardBody>
          <Form form={formNews} layout="vertical">
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

            <Form.Item name="image" label="Image" valuePropName="fileList">
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

        <CCardFooter style={{ display: 'flex', justifyContent: 'end', paddingBlock: '15px' }}>
          <CButton color="primary" size="sm">
            <CIcon icon={cilInbox} className="me-2" />
            Save Changes
          </CButton>
        </CCardFooter>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>
          Regulations Category
          <DocsLink href="https://coreui.io/docs/content/typography/" />
        </CCardHeader>

        <CCardBody>
          <Form form={formCategories} layout="vertical">
            <Form.Item name="title" label="Title">
              <Input />
            </Form.Item>
          </Form>

          <p className="">Categories List</p>
        </CCardBody>

        <CCardFooter style={{ display: 'flex', justifyContent: 'end', paddingBlock: '15px' }}>
          <CButton color="primary" size="sm">
            <CIcon icon={cilInbox} className="me-2" />
            Save Changes
          </CButton>
        </CCardFooter>
      </CCard>

      {/* <CCard className="mb-4">
        <CCardHeader>Headings</CCardHeader>
        <CCardBody>
          <p>
            <code className="highlighter-rouge">.h1</code> through
            <code className="highlighter-rouge">.h6</code>
            classes are also available, for when you want to match the font styling of a heading but
            cannot use the associated HTML element.
          </p>
          <div className="bd-example">
            <p className="h1">h1. Bootstrap heading</p>
            <p className="h2">h2. Bootstrap heading</p>
            <p className="h3">h3. Bootstrap heading</p>
            <p className="h4">h4. Bootstrap heading</p>
            <p className="h5">h5. Bootstrap heading</p>
            <p className="h6">h6. Bootstrap heading</p>
          </div>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <div className="card-header">Display headings</div>
        <div className="card-body">
          <p>
            Traditional heading elements are designed to work best in the meat of your page content.
            When you need a heading to stand out, consider using a <strong>display heading</strong>
            —a larger, slightly more opinionated heading style.
          </p>
          <div className="bd-example bd-example-type">
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <span className="display-1">Display 1</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="display-2">Display 2</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="display-3">Display 3</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="display-4">Display 4</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>Inline text elements</CCardHeader>
        <CCardBody>
          <p>
            Traditional heading elements are designed to work best in the meat of your page content.
            When you need a heading to stand out, consider using a <strong>display heading</strong>
            —a larger, slightly more opinionated heading style.
          </p>
          <div className="bd-example">
            <p>
              You can use the mark tag to <mark>highlight</mark> text.
            </p>
            <p>
              <del>This line of text is meant to be treated as deleted text.</del>
            </p>
            <p>
              <s>This line of text is meant to be treated as no longer accurate.</s>
            </p>
            <p>
              <ins>This line of text is meant to be treated as an addition to the document.</ins>
            </p>
            <p>
              <u>This line of text will render as underlined</u>
            </p>
            <p>
              <small>This line of text is meant to be treated as fine print.</small>
            </p>
            <p>
              <strong>This line rendered as bold text.</strong>
            </p>
            <p>
              <em>This line rendered as italicized text.</em>
            </p>
          </div>
        </CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>Description list alignment</CCardHeader>
        <CCardBody>
          <p>
            Align terms and descriptions horizontally by using our grid system’s predefined classes
            (or semantic mixins). For longer terms, you can optionally add a{' '}
            <code className="highlighter-rouge">.text-truncate</code> class to truncate the text
            with an ellipsis.
          </p>
          <div className="bd-example">
            <dl className="row">
              <dt className="col-sm-3">Description lists</dt>
              <dd className="col-sm-9">A description list is perfect for defining terms.</dd>

              <dt className="col-sm-3">Euismod</dt>
              <dd className="col-sm-9">
                <p>
                  Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.
                </p>
                <p>Donec id elit non mi porta gravida at eget metus.</p>
              </dd>

              <dt className="col-sm-3">Malesuada porta</dt>
              <dd className="col-sm-9">Etiam porta sem malesuada magna mollis euismod.</dd>

              <dt className="col-sm-3 text-truncate">Truncated term is truncated</dt>
              <dd className="col-sm-9">
                Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut
                fermentum massa justo sit amet risus.
              </dd>

              <dt className="col-sm-3">Nesting</dt>
              <dd className="col-sm-9">
                <dl className="row">
                  <dt className="col-sm-4">Nested definition list</dt>
                  <dd className="col-sm-8">
                    Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc.
                  </dd>
                </dl>
              </dd>
            </dl>
          </div>
        </CCardBody>
      </CCard> */}
    </>
  )
}

export default Regulations
