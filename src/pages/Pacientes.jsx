import React, { useState } from 'react'
import Table from '../components/Table'
import Card from '../components/Card'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { mockPacientes } from '../data/mockData'
import '../styles/tables.css'

const Pacientes = () => {
  const [pacientes, setPacientes] = useState(mockPacientes)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({ nombre: '', email: '', telefono: '', direccion: '' })

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Nombre', key: 'nombre' },
    { label: 'Email', key: 'email' },
    { label: 'Teléfono', key: 'telefono' },
    { label: 'Dirección', key: 'direccion' },
  ]

  const handleDelete = (paciente) => {
    if (confirm(`¿Eliminar a ${paciente.nombre}?`)) {
      setPacientes(pacientes.filter(p => p.id !== paciente.id))
    }
  }

  const handleEdit = (paciente) => {
    setEditing(paciente.id)
    setFormData(paciente)
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      setPacientes(pacientes.map(p => p.id === editing ? { ...p, ...formData } : p))
    } else {
      const newId = Math.max(...pacientes.map(p => p.id), 0) + 1
      setPacientes([...pacientes, { id: newId, ...formData }])
    }
    setShowModal(false)
    setEditing(null)
    setFormData({ nombre: '', email: '', telefono: '', direccion: '' })
  }

  const actions = [
    { icon: <FaEdit />, label: '', className: 'edit', handler: handleEdit },
    { icon: <FaTrash />, label: '', className: 'delete', handler: handleDelete },
  ]

  return (
    <div>
      <div className="page-header">
        <h1>Pacientes</h1>
        <button className="btn-primary" onClick={() => { setEditing(null); setFormData({ nombre: '', email: '', telefono: '', direccion: '' }); setShowModal(true) }}>
          <FaPlus /> Nuevo Paciente
        </button>
      </div>
      <Card>
        <Table columns={columns} data={pacientes} actions={actions} />
      </Card>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editing ? 'Editar Paciente' : 'Nuevo Paciente'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre</label>
                <input value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input value={formData.telefono} onChange={e => setFormData({ ...formData, telefono: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Dirección</label>
                <input value={formData.direccion} onChange={e => setFormData({ ...formData, direccion: e.target.value })} />
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

export default Pacientes