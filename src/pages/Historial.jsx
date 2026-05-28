import React, { useState } from 'react'
import Table from '../components/Table'
import Card from '../components/Card'
import { FaEdit, FaTrash, FaPlus, FaFileMedical } from 'react-icons/fa'
import { mockHistorial, mockPacientes } from '../data/mockData'

const Historial = () => {
  const [historial, setHistorial] = useState(mockHistorial)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    pacienteId: '',
    fecha: '',
    diagnostico: '',
    tratamiento: '',
    notas: ''
  })

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Paciente', key: 'pacienteNombre' },
    { label: 'Fecha', key: 'fecha' },
    { label: 'Diagnóstico', key: 'diagnostico' },
    { label: 'Tratamiento', key: 'tratamiento' },
  ]

  const getPacienteNombre = (id) => {
    const p = mockPacientes.find(p => p.id === parseInt(id))
    return p ? p.nombre : ''
  }

  const handleDelete = (reg) => {
    if (confirm(`¿Eliminar registro médico?`)) {
      setHistorial(historial.filter(h => h.id !== reg.id))
    }
  }

  const handleEdit = (reg) => {
    setEditing(reg.id)
    setFormData({
      pacienteId: reg.pacienteId,
      fecha: reg.fecha,
      diagnostico: reg.diagnostico,
      tratamiento: reg.tratamiento,
      notas: reg.notas || ''
    })
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const pacienteNombre = getPacienteNombre(formData.pacienteId)
    if (editing) {
      setHistorial(historial.map(h => h.id === editing ? {
        ...h,
        ...formData,
        pacienteNombre
      } : h))
    } else {
      const newId = Math.max(...historial.map(h => h.id), 0) + 1
      setHistorial([...historial, {
        id: newId,
        ...formData,
        pacienteNombre
      }])
    }
    setShowModal(false)
    setEditing(null)
    setFormData({ pacienteId: '', fecha: '', diagnostico: '', tratamiento: '', notas: '' })
  }

  const actions = [
    { icon: <FaEdit />, label: '', className: 'edit', handler: handleEdit },
    { icon: <FaTrash />, label: '', className: 'delete', handler: handleDelete },
  ]

  const tableData = historial.map(h => ({
    ...h,
    pacienteNombre: getPacienteNombre(h.pacienteId)
  }))

  return (
    <div>
      <div className="page-header">
        <h1>Historial Médico</h1>
        <button className="btn-primary" onClick={() => { setEditing(null); setFormData({ pacienteId: '', fecha: '', diagnostico: '', tratamiento: '', notas: '' }); setShowModal(true) }}>
          <FaPlus /> Nuevo Registro
        </button>
      </div>
      <Card>
        <Table columns={columns} data={tableData} actions={actions} />
      </Card>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editing ? 'Editar Registro' : 'Nuevo Registro Médico'}</h2>
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
                <label>Fecha</label>
                <input type="date" value={formData.fecha} onChange={e => setFormData({ ...formData, fecha: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Diagnóstico</label>
                <textarea value={formData.diagnostico} onChange={e => setFormData({ ...formData, diagnostico: e.target.value })} rows="3" required />
              </div>
              <div className="form-group">
                <label>Tratamiento</label>
                <textarea value={formData.tratamiento} onChange={e => setFormData({ ...formData, tratamiento: e.target.value })} rows="3" />
              </div>
              <div className="form-group">
                <label>Notas adicionales</label>
                <textarea value={formData.notas} onChange={e => setFormData({ ...formData, notas: e.target.value })} rows="2" />
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

export default Historial