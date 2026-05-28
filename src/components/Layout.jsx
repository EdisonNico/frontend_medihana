import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import '../styles/layout.css'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} />
      <div className="main-content">
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="page-container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout