import React, { useState } from 'react'
import Table from '../components/Table'
import Card from '../components/Card'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { mockPagos, mockFacturas } from '../data/mockData'

const Pagos = () => {
  const [pagos, setPagos] = useState(mockPagos)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    facturaId: '',
    monto: '',
    fecha: '',
    metodo: 'Efectivo'
  })

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'Factura ID', key: 'facturaId' },
    { label: 'Monto', key: 'monto' },
    { label: 'Fecha', key: 'fecha' },
    { label: 'Método', key: 'metodo' },
  ]

  const handleDelete = (pago) => {
    if (confirm(`¿Eliminar pago #${pago.id}?`)) {
      setPagos(pagos.filter(p => p.id !== pago.id))
    }
  }

  const handleEdit = (pago) => {
    setEditing(pago.id)
    setFormData({
      facturaId: pago.facturaId,
      monto: pago.monto,
      fecha: pago.fecha,
      metodo: pago.metodo
    })
    setShowModal(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editing) {
      setPagos(pagos.map(p => p.id === editing ? { ...p, ...formData } : p))
    } else {
      const newId = Math.max(...pagos.map(p => p.id), 0) + 1
      setPagos([...pagos, { id: newId, ...formData }])
    }
    setShowModal(false)
    setEditing(null)
    setFormData({ facturaId: '', monto: '', fecha: '', metodo: 'Efectivo' })
  }

  const actions = [
    { icon: <FaEdit />, label: '', className: 'edit', handler: handleEdit },
    { icon: <FaTrash />, label: '', className: 'delete', handler: handleDelete },
  ]

  const tableData = pagos.map(p => ({
    ...p,
    monto: `$${p.monto}`
  }))

  return (
    <div>
      <div className="page-header">
        <h1>Pagos</h1>
        <button className="btn-primary" onClick={() => { setEditing(null); setFormData({ facturaId: '', monto: '', fecha: '', metodo: 'Efectivo' }); setShowModal(true) }}>
          <FaPlus /> Registrar Pago
        </button>
      </div>
      <Card>
        <Table columns={columns} data={tableData} actions={actions} />
      </Card>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editing ? 'Editar Pago' : 'Registrar Pago'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Factura</label>
                <select value={formData.facturaId} onChange={e => setFormData({ ...formData, facturaId: e.target.value })} required>
                  <option value="">Seleccione factura</option>
                  {mockFacturas.map(f => (
                    <option key={f.id} value={f.id}>Factura #{f.id} - ${f.monto}</option>
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
                <label>Método de pago</label>
                <select value={formData.metodo} onChange={e => setFormData({ ...formData, metodo: e.target.value })}>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta Crédito">Tarjeta Crédito</option>
                  <option value="Tarjeta Débito">Tarjeta Débito</option>
                  <option value="Transferencia">Transferencia</option>
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

export default Pagos