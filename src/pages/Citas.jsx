import React, { useState } from 'react'
import Table from '../components/Table'
import Card from '../components/Card'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { mockCitas, mockPacientes, mockMedicos } from '../data/mockData'

const Citas = () => {
  const [citas, setCitas] = useState(mockCitas)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    pacienteId: '',
    medicoId: '',
    fecha: '',
    hora: '',
    estado: 'Pendiente'
  })

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Paciente', key: 'pacienteNombre' },
    { label: 'Médico', key: 'medicoNombre' },
    { label: 'Fecha', key: 'fecha' },
    { label: 'Hora', key: 'hora' },
    { label: 'Estado', key: 'estado' },
  ]

  const getPacienteNombre = (id) => {
    const p = mockPacientes.find(p => p.id === parseInt(id))
    return p ? p.nombre : ''
  }

  const getMedicoNombre = (id) => {
    const m = mockMedicos.find(m => m.id === parseInt(id))
    return m ? m.nombre : ''
  }

  const handleDelete = (cita) => {
    if (confirm(`¿Cancelar cita?`)) {
      setCitas(citas.filter(c => c.id !== cita.id))
    }
  }

  const handleEdit = (cita) => {
    setEditing(cita.id)
    setFormData({
      pacienteId: cita.pacienteId,
      medicoId: cita.medicoId,
      fecha: cita.fecha,
      hora: cita.hora,
      estado: cita.estado
    })
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const pacienteNombre = getPacienteNombre(formData.pacienteId)
    const medicoNombre = getMedicoNombre(formData.medicoId)
    if (editing) {
      setCitas(citas.map(c => c.id === editing ? {
        ...c,
        ...formData,
        pacienteNombre,
        medicoNombre
      } : c))
    } else {
      const newId = Math.max(...citas.map(c => c.id), 0) + 1
      setCitas([...citas, {
        id: newId,
        ...formData,
        pacienteNombre,
        medicoNombre
      }])
    }
    setShowModal(false)
    setEditing(null)
    setFormData({ pacienteId: '', medicoId: '', fecha: '', hora: '', estado: 'Pendiente' })
  }

  const actions = [
    { icon: <FaEdit />, label: '', className: 'edit', handler: handleEdit },
    { icon: <FaTrash />, label: '', className: 'delete', handler: handleDelete },
  ]

  const tableData = citas.map(c => ({
    ...c,
    pacienteNombre: getPacienteNombre(c.pacienteId),
    medicoNombre: getMedicoNombre(c.medicoId)
  }))

  return (
    <div>
      <div className="page-header">
        <h1>Citas</h1>
        <button className="btn-primary" onClick={() => { setEditing(null); setFormData({ pacienteId: '', medicoId: '', fecha: '', hora: '', estado: 'Pendiente' }); setShowModal(true) }}>
          <FaPlus /> Nueva Cita
        </button>
      </div>
      <Card>
        <Table columns={columns} data={tableData} actions={actions} />
      </Card>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editing ? 'Editar Cita' : 'Nueva Cita'}</h2>
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
                <label>Médico</label>
                <select value={formData.medicoId} onChange={e => setFormData({ ...formData, medicoId: e.target.value })} required>
                  <option value="">Seleccione</option>
                  {mockMedicos.map(m => (
                    <option key={m.id} value={m.id}>{m.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Fecha</label>
                <input type="date" value={formData.fecha} onChange={e => setFormData({ ...formData, fecha: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Hora</label>
                <input type="time" value={formData.hora} onChange={e => setFormData({ ...formData, hora: e.target.value })} required />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <select value={formData.estado} onChange={e => setFormData({ ...formData, estado: e.target.value })}>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Confirmada">Confirmada</option>
                  <option value="Cancelada">Cancelada</option>
                  <option value="Atendida">Atendida</option>
                </select>
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

export default Citas