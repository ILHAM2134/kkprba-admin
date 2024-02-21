import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'
import { axios } from 'src/utils'
import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const name = window.sessionStorage.getItem('name')
  const username = window.sessionStorage.getItem('username')

  const logOut = () => {
    axios
      .post('/logout')
      .then((resLogout) => {
        console.log({ resLogout })
        navigate('/login')
      })
      .catch(() => {})
      .finally(() => {
        window.sessionStorage.clear()
      })
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>

      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>

        <CDropdownItem href="#">
          <CIcon icon={cilUser} className="me-2" />
          {name || 'Undefined'}
        </CDropdownItem>

        <CDropdownItem href="#">
          {/* <CIcon icon={cilSettings} className="me-2" /> */}
          {username || 'undefined'}
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
