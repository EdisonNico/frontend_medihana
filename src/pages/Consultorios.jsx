import React, { useState } from 'react'
import Table from '../components/Table'
import Card from '../components/Card'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { mockConsultorios } from '../data/mockData'

const Consultorios = () => {
  const [consultorios, setConsultorios] = useState(mockConsultorios)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({ nombre: '', ubicacion: '', telefono: '' })

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Nombre', key: 'nombre' },
    { label: 'Ubicación', key: 'ubicacion' },
    { label: 'Teléfono', key: 'telefono' },
  ]

  const handleDelete = (c) => {
    if (confirm(`¿Eliminar consultorio ${c.nombre}?`)) {
      setConsultorios(consultorios.filter(con => con.id !== c.id))
    }
  }

  const handleEdit = (c) => {
    setEditing(c.id)
    setFormData({ nombre: c.nombre, ubicacion: c.ubicacion, telefono: c.telefono })
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      setConsultorios(consultorios.map(c => c.id === editing ? { ...c, ...formData } : c))
    } else {
      const newId = Math.max(...consultorios.map(c => c.id), 0) + 1
      setConsultorios([...consultorios, { id: newId, ...formData }])
    }
    setShowModal(false)
    setEditing(null)
    setFormData({ nombre: '', ubicacion: '', telefono: '' })
  }

  const actions = [
    { icon: <FaEdit />, label: '', className: 'edit', handler: handleEdit },
    { icon: <FaTrash />, label: '', className: 'delete', handler: handleDelete },
  ]

  return (
    <div>
      <div className="page-header">
        <h1>Consultorios</h1>
        <button className="btn-primary" onClick={() => { setEditing(null); setFormData({ nombre: '', ubicacion: '', telefono: '' }); setShowModal(true) }}>
          <FaPlus /> Nuevo Consultorio
        </button>
      </div>
      <Card>
        <Table columns={columns} data={consultorios} actions={actions} />
      </Card>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editing ? 'Editar Consultorio' : 'Nuevo Consultorio'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre</label>
                <input value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Ubicación</label>
                <input value={formData.ubicacion} onChange={e => setFormData({ ...formData, ubicacion: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input value={formData.telefono} onChange={e => setFormData({ ...formData, telefono: e.target.value })} />
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

export default Consultorios