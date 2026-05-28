import React, { useState } from 'react'
import Table from '../components/Table'
import Card from '../components/Card'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { mockEspecialidades } from '../data/mockData'

const Especialidades = () => {
  const [especialidades, setEspecialidades] = useState(mockEspecialidades)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' })

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Nombre', key: 'nombre' },
    { label: 'Descripción', key: 'descripcion' },
  ]

  const handleDelete = (esp) => {
    if (confirm(`¿Eliminar especialidad ${esp.nombre}?`)) {
      setEspecialidades(especialidades.filter(e => e.id !== esp.id))
    }
  }

  const handleEdit = (esp) => {
    setEditing(esp.id)
    setFormData({ nombre: esp.nombre, descripcion: esp.descripcion })
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      setEspecialidades(especialidades.map(e => e.id === editing ? { ...e, ...formData } : e))
    } else {
      const newId = Math.max(...especialidades.map(e => e.id), 0) + 1
      setEspecialidades([...especialidades, { id: newId, ...formData }])
    }
    setShowModal(false)
    setEditing(null)
    setFormData({ nombre: '', descripcion: '' })
  }

  const actions = [
    { icon: <FaEdit />, label: '', className: 'edit', handler: handleEdit },
    { icon: <FaTrash />, label: '', className: 'delete', handler: handleDelete },
  ]

  return (
    <div>
      <div className="page-header">
        <h1>Especialidades</h1>
        <button className="btn-primary" onClick={() => { setEditing(null); setFormData({ nombre: '', descripcion: '' }); setShowModal(true) }}>
          <FaPlus /> Nueva Especialidad
        </button>
      </div>
      <Card>
        <Table columns={columns} data={especialidades} actions={actions} />
      </Card>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editing ? 'Editar Especialidad' : 'Nueva Especialidad'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre</label>
                <input value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <input value={formData.descripcion} onChange={e => setFormData({ ...formData, descripcion: e.target.value })} />
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

export default Especialidades