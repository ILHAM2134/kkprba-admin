import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

// import { logoNegative } from 'src/assets/brand/logo-negative'
// import { sygnet } from 'src/assets/brand/sygnet'

import bigLogo from 'src/assets/brand/logo-dark.svg'
import smallLogo from 'src/assets/brand/logo.png'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const sidebarUnfoldable = useSelector((state) => state.sidebarUnfoldable)

  return (
    <CSidebar position="fixed" narrow={sidebarUnfoldable}>
      <CSidebarBrand className="d-none d-md-flex" to="/">
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />

        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}
        <img alt="logo big" className="sidebar-brand-full" src={bigLogo} height={35} />

        <img alt="logo small" className="sidebar-brand-narrow" src={smallLogo} height={35} />
      </CSidebarBrand>

      <CSidebarNav className="sidebar-nav">
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>

      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !sidebarUnfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
