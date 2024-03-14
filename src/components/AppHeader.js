import React, { useState } from 'react'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CNavLink,
  CNavItem,
  CNavbarToggler,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasTitle,
  CCloseButton,
  COffcanvasBody,
  CNavbarNav,
  // CDropdown,
  // CDropdownToggle,
  // CDropdownMenu,
  // CDropdownItem,
  // CDropdownDivider,
  // CForm,
  // CFormInput,
  // CButton,
  // CDropdown,
  // CDropdownToggle,
  // CDropdownMenu,
  // CDropdownHeader,
  // CDropdownItem,
  // CDropdownDivider,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilHamburgerMenu } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
// import { logo } from 'src/assets/brand/logo'
import smallLogo from 'src/assets/brand/logo.png'
import navigation from '../_nav'

// import { cilLockLocked, cilUser } from '@coreui/icons'

const AppHeader = () => {
  const [visible, setVisible] = useState(false)

  return (
    <CHeader position="sticky mb-5">
      <CContainer fluid>
        <CNavbarToggler
          className="over-770px-none"
          style={{ color: 'black' }}
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
          onClick={() => setVisible(!visible)}
        >
          <CIcon icon={cilHamburgerMenu} size="lg" />
        </CNavbarToggler>

        <COffcanvas
          id="offcanvasNavbar"
          placement="end"
          portal={false}
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <COffcanvasHeader>
            <COffcanvasTitle>Offcanvas</COffcanvasTitle>

            <CCloseButton className="text-reset" onClick={() => setVisible(false)} />
          </COffcanvasHeader>

          {/* <COffcanvasBody>
            <CNavbarNav>
              <CNavItem>
                <CNavLink href="#" active>
                  Home
                </CNavLink>
              </CNavItem>

              <CNavItem>
                <CNavLink href="#">Link</CNavLink>
              </CNavItem>

              <CDropdown variant="nav-item" popper={false}>
                <CDropdownToggle color="secondary">Dropdown button</CDropdownToggle>

                <CDropdownMenu>
                  <CDropdownItem href="#">Action</CDropdownItem>

                  <CDropdownItem href="#">Another action</CDropdownItem>

                  <CDropdownDivider />

                  <CDropdownItem href="#">Something else here</CDropdownItem>
                </CDropdownMenu>
              </CDropdown>

              <CNavItem>
                <CNavLink href="#" disabled>
                  Disabled
                </CNavLink>
              </CNavItem>
            </CNavbarNav>

            <CForm className="d-flex">
              <CFormInput type="search" className="me-2" placeholder="Search" />

              <CButton type="submit" color="success" variant="outline">
                Search
              </CButton>
            </CForm>
          </COffcanvasBody> */}

          <COffcanvasBody>
            <CNavbarNav>
              {navigation.map((item) => (
                <CNavItem>
                  <CNavLink href={item?.to}>{item?.name}</CNavLink>
                </CNavItem>
              ))}
            </CNavbarNav>
          </COffcanvasBody>
        </COffcanvas>

        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <div
            style={{
              display: 'flex',
            }}
          >
            <img src={smallLogo} alt="Logo" style={{ height: '50px' }} />

            <p style={{ marginBlock: 'auto' }}>KKPRBA</p>
          </div>
        </CHeaderBrand>

        <CHeaderNav className="d-none d-md-flex me-auto"></CHeaderNav>

        <CHeaderNav>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilBell} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav className="">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
