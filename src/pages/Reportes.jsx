import React, { useState } from 'react'
import Card from '../components/Card'
import { FaFilePdf, FaFileExcel, FaChartBar } from 'react-icons/fa'
import { mockCitas, mockFacturas, mockPagos } from '../data/mockData'

const Reportes = () => {
  const [tipoReporte, setTipoReporte] = useState('citas')
  const [fechaInicio, setFechaInicio] = useState('')
  const [fechaFin, setFechaFin] = useState('')

  const generarReporte = () => {
    alert(`Generando reporte de ${tipoReporte} desde ${fechaInicio} hasta ${fechaFin}`)
    // Aquí iría la lógica real de generación de reportes
  }

  const obtenerResumen = () => {
    const totalFacturas = mockFacturas.reduce((sum, f) => sum + f.monto, 0)
    const totalPagado = mockPagos.reduce((sum, p) => sum + p.monto, 0)
    const citasConfirmadas = mockCitas.filter(c => c.estado === 'Confirmada').length

    return { totalFacturas, totalPagado, citasConfirmadas }
  }

  const resumen = obtenerResumen()

  return (
    <div>
      <h1>Reportes</h1>
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-card" style={{ borderTopColor: '#2c7da0' }}>
          <div className="stat-icon"><FaChartBar /></div>
          <div className="stat-info">
            <h3>Facturación Total</h3>
            <p>${resumen.totalFacturas}</p>
          </div>
        </div>
        <div className="stat-card" style={{ borderTopColor: '#61a5c2' }}>
          <div className="stat-icon"><FaChartBar /></div>
          <div className="stat-info">
            <h3>Total Pagado</h3>
            <p>${resumen.totalPagado}</p>
          </div>
        </div>
        <div className="stat-card" style={{ borderTopColor: '#2c7da0' }}>
          <div className="stat-icon"><FaChartBar /></div>
          <div className="stat-info">
            <h3>Citas Confirmadas</h3>
            <p>{resumen.citasConfirmadas}</p>
          </div>
        </div>
      </div>

      <Card title="Generador de Reportes">
        <div className="form-group">
          <label>Tipo de reporte</label>
          <select value={tipoReporte} onChange={e => setTipoReporte(e.target.value)}>
            <option value="citas">Reporte de Citas</option>
            <option value="facturas">Reporte de Facturación</option>
            <option value="pagos">Reporte de Pagos</option>
            <option value="pacientes">Reporte de Pacientes</option>
          </select>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Fecha inicio</label>
            <input type="date" value={fechaInicio} onChange={e => setFechaInicio(e.target.value)} />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label>Fecha fin</label>
            <input type="date" value={fechaFin} onChange={e => setFechaFin(e.target.value)} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-primary" onClick={generarReporte}>
            <FaFilePdf /> Generar PDF
          </button>
          <button className="btn-primary" onClick={generarReporte}>
            <FaFileExcel /> Exportar Excel
          </button>
        </div>
      </Card>

      <Card title="Reportes Rápidos" style={{ marginTop: '1.5rem' }}>
        <ul className="recent-list">
          <li><button className="btn-link" onClick={() => alert('Reporte de citas del mes')}>📅 Citas del mes actual</button></li>
          <li><button className="btn-link" onClick={() => alert('Facturas pendientes')}>💰 Facturas pendientes</button></li>
          <li><button className="btn-link" onClick={() => alert('Top 5 médicos con más citas')}>👨‍⚕️ Médicos más solicitados</button></li>
        </ul>
      </Card>
    </div>
  )
}

export default Reportes