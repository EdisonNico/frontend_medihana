import React, { useState } from 'react'
import Table from '../components/Table'
import Card from '../components/Card'
import { FaEdit, FaTrash, FaPlus, FaPrint } from 'react-icons/fa'
import { mockFacturas, mockPacientes } from '../data/mockData'

const Facturas = () => {
  const [facturas, setFacturas] = useState(mockFacturas)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    pacienteId: '',
    monto: '',
    fecha: '',
    estado: 'Pendiente',
    descripcion: ''
  })

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Paciente', key: 'pacienteNombre' },
    { label: 'Monto', key: 'monto' },
    { label: 'Fecha', key: 'fecha' },
    { label: 'Estado', key: 'estado' },
  ]

  const getPacienteNombre = (id) => {
    const p = mockPacientes.find(p => p.id === parseInt(id))
    return p ? p.nombre : ''
  }

  const handleDelete = (fact) => {
    if (confirm(`¿Eliminar factura #${fact.id}?`)) {
      setFacturas(facturas.filter(f => f.id !== fact.id))
    }
  }

  const handleEdit = (fact) => {
    setEditing(fact.id)
    setFormData({
      pacienteId: fact.pacienteId,
      monto: fact.monto,
      fecha: fact.fecha,
      estado: fact.estado,
      descripcion: fact.descripcion || ''
    })
    setShowModal(true)
  }

  const handlePrint = (fact) => {
    alert(`Imprimiendo factura #${fact.id} - Monto: $${fact.monto}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const pacienteNombre = getPacienteNombre(formData.pacienteId)
    if (editing) {
      setFacturas(facturas.map(f => f.id === editing ? {
        ...f,
        ...formData,
        pacienteNombre
      } : f))
    } else {
      const newId = Math.max(...facturas.map(f => f.id), 0) + 1
      setFacturas([...facturas, {
        id: newId,
        ...formData,
        pacienteNombre
      }])
    }
    setShowModal(false)
    setEditing(null)
    setFormData({ pacienteId: '', monto: '', fecha: '', estado: 'Pendiente', descripcion: '' })
  }

  const actions = [
    { icon: <FaEdit />, label: '', className: 'edit', handler: handleEdit },
    { icon: <FaPrint />, label: '', className: 'edit', handler: handlePrint },
    { icon: <FaTrash />, label: '', className: 'delete', handler: handleDelete },
  ]

  const tableData = facturas.map(f => ({
    ...f,
    pacienteNombre: getPacienteNombre(f.pacienteId),
    monto: `$${f.monto}`
  }))

  return (
    <div>
      <div className="page-header">
        <h1>Facturas</h1>
        <button className="btn-primary" onClick={() => { setEditing(null); setFormData({ pacienteId: '', monto: '', fecha: '', estado: 'Pendiente', descripcion: '' }); setShowModal(true) }}>
          <FaPlus /> Nueva Factura
        </button>
      </div>
      <Card>
        <Table columns={columns} data={tableData} actions={actions} />
      </Card>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editing ? 'Editar Factura' : 'Nueva Factura'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Paciente</label>
                <select value={formData.pacienteId} onChange={e => setFormData({ ...formData, pacienteId: e.target.value })} required>
                  <option value="">Seleccione</option>
                  {mockPacientes.map(p => (
                    <option key={p.id} value={p.id}>{p.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Monto</label>
                <input type="number" step="0.01" value={formData.monto} onChange={e => setFormData({ ...formData, monto: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Fecha</label>
                <input type="date" value={formData.fecha} onChange={e => setFormData({ ...formData, fecha: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <select value={formData.estado} onChange={e => setFormData({ ...formData, estado: e.target.value })}>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Pagado">Pagado</option>
                  <option value="Vencido">Vencido</option>
                </select>
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea value={formData.descripcion} onChange={e => setFormData({ ...formData, descripcion: e.target.value })} rows="2" />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Facturas