import React from 'react'
import { useAuth } from '../context/AuthContext'
import { FiMenu, FiLogOut } from 'react-icons/fi'
import '../styles/layout.css'

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth()

  return (
    <nav className="navbar">
      <button className="menu-btn" onClick={toggleSidebar}>
        <FiMenu size={24} />
      </button>
      <div className="navbar-brand">MediHana</div>
      <div className="navbar-user">
        <span>Hola, {user?.name}</span>
        <button className="logout-btn" onClick={logout}>
          <FiLogOut /> Salir
        </button>
      </div>
    </nav>
  )
}

export default Navbar