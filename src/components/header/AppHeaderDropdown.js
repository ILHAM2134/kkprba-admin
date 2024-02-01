import React from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilSettings, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { useSelector } from 'react-redux'
import { notification } from 'antd'
import { axios } from 'src/utils'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const { dataUser } = useSelector((state) => state)
  const navigate = useNavigate()

  const logOut = () => {
    axios
      .post('/logout')
      .then((res) => {
        navigate('/login')
      })
      .catch(() => {})
      .finally(() => {})
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          {dataUser?.name || 'Undefined'}
        </CDropdownItem>
        <CDropdownItem href="#">
          {/* <CIcon icon={cilSettings} className="me-2" /> */}
          {dataUser?.username || 'undefined'}
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={logOut}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
