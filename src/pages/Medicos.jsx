import React, { useState } from 'react'
import Table from '../components/Table'
import Card from '../components/Card'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { mockMedicos, mockEspecialidades } from '../data/mockData'

const Medicos = () => {
  const [medicos, setMedicos] = useState(mockMedicos)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    especialidadId: '',
    email: '',
    telefono: ''
  })

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Nombre', key: 'nombre' },
    { label: 'Especialidad', key: 'especialidadNombre' },
    { label: 'Email', key: 'email' },
    { label: 'Teléfono', key: 'telefono' },
  ]

  const getEspecialidadNombre = (id) => {
    const esp = mockEspecialidades.find(e => e.id === parseInt(id))
    return esp ? esp.nombre : ''
  }

  const handleDelete = (medico) => {
    if (confirm(`¿Eliminar a ${medico.nombre}?`)) {
      setMedicos(medicos.filter(m => m.id !== medico.id))
    }
  }

  const handleEdit = (medico) => {
    setEditing(medico.id)
    setFormData({
      nombre: medico.nombre,
      especialidadId: medico.especialidadId,
      email: medico.email,
      telefono: medico.telefono
    })
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const especialidadNombre = getEspecialidadNombre(formData.especialidadId)
    if (editing) {
      setMedicos(medicos.map(m => m.id === editing ? {
        ...m,
        ...formData,
        especialidadNombre
      } : m))
    } else {
      const newId = Math.max(...medicos.map(m => m.id), 0) + 1
      setMedicos([...medicos, {
        id: newId,
        ...formData,
        especialidadNombre
      }])
    }
    setShowModal(false)
    setEditing(null)
    setFormData({ nombre: '', especialidadId: '', email: '', telefono: '' })
  }

  const actions = [
    { icon: <FaEdit />, label: '', className: 'edit', handler: handleEdit },
    { icon: <FaTrash />, label: '', className: 'delete', handler: handleDelete },
  ]

  // Enriquecer los datos para mostrar el nombre de especialidad
  const tableData = medicos.map(m => ({
    ...m,
    especialidadNombre: getEspecialidadNombre(m.especialidadId)
  }))

  return (
    <div>
      <div className="page-header">
        <h1>Médicos</h1>
        <button className="btn-primary" onClick={() => {
          setEditing(null)
          setFormData({ nombre: '', especialidadId: '', email: '', telefono: '' })
          setShowModal(true)
        }}>
          <FaPlus /> Nuevo Médico
        </button>
      </div>
      <Card>
        <Table columns={columns} data={tableData} actions={actions} />
      </Card>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editing ? 'Editar Médico' : 'Nuevo Médico'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre</label>
                <input value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Especialidad</label>
                <select value={formData.especialidadId} onChange={e => setFormData({ ...formData, especialidadId: e.target.value })} required>
                  <option value="">Seleccione</option>
                  {mockEspecialidades.map(esp => (
                    <option key={esp.id} value={esp.id}>{esp.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
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

export default Medicos