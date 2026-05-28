import React from 'react'
import Card from '../components/Card'
import { 
  FaUsers, FaUserMd, FaCalendarCheck, FaMoneyBillWave 
} from 'react-icons/fa'
import '../styles/dashboard.css'

const Dashboard = () => {
  // Datos mock para tarjetas
  const stats = [
    { title: 'Pacientes', value: 124, icon: <FaUsers />, color: '#2c7da0' },
    { title: 'Médicos', value: 18, icon: <FaUserMd />, color: '#61a5c2' },
    { title: 'Citas Hoy', value: 32, icon: <FaCalendarCheck />, color: '#2c7da0' },
    { title: 'Facturación (mes)', value: '$12,450', icon: <FaMoneyBillWave />, color: '#61a5c2' },
  ]

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <div key={idx} className="stat-card" style={{ borderTopColor: stat.color }}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="dashboard-grid">
        <Card title="Próximas citas">
          <ul className="recent-list">
            <li>Ana García - Dr. López - 10:00 AM</li>
            <li>Carlos Ruiz - Dra. Martínez - 11:30 AM</li>
            <li>María Pérez - Dr. Sánchez - 12:00 PM</li>
          </ul>
        </Card>
        <Card title="Pagos recientes">
          <ul className="recent-list">
            <li>Factura #001 - $150 - Pagado</li>
            <li>Factura #002 - $200 - Pendiente</li>
            <li>Factura #003 - $90 - Pagado</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard