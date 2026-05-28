import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  FiHome, FiUsers, FiUserPlus, FiBook, FiMapPin, 
  FiCalendar, FiFileText, FiDollarSign, FiCreditCard, FiBarChart2 
} from 'react-icons/fi'
import '../styles/layout.css'

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
    { path: '/pacientes', label: 'Pacientes', icon: <FiUsers /> },
    { path: '/medicos', label: 'Médicos', icon: <FiUserPlus /> },
    { path: '/especialidades', label: 'Especialidades', icon: <FiBook /> },
    { path: '/consultorios', label: 'Consultorios', icon: <FiMapPin /> },
    { path: '/citas', label: 'Citas', icon: <FiCalendar /> },
    { path: '/historial', label: 'Historial Médico', icon: <FiFileText /> },
    { path: '/facturas', label: 'Facturas', icon: <FiDollarSign /> },
    { path: '/pagos', label: 'Pagos', icon: <FiCreditCard /> },
    { path: '/reportes', label: 'Reportes', icon: <FiBarChart2 /> },
  ]

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-logo">MediHana</div>
      <ul className="sidebar-nav">
        {menuItems.map(item => (
          <li key={item.path}>
            <NavLink to={item.path} className={({ isActive }) => isActive ? 'active' : ''}>
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar