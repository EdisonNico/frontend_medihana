// src/pages/Medicos.jsx
import React, { useState } from 'react';
import Table from '../components/Table';
import Card from '../components/Card';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import { mockMedicos, mockEspecialidades } from '../data/mockData';

const Medicos = () => {
  const [medicos, setMedicos] = useState(mockMedicos);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    especialidadId: '',
    email: '',
    telefono: ''
  });

  // Filtrar médicos según búsqueda (ID, DNI, nombre, especialidad)
  const filteredMedicos = medicos.filter(medico => {
    const term = searchTerm.toLowerCase();
    const especialidadNombre = mockEspecialidades.find(e => e.id === medico.especialidadId)?.nombre.toLowerCase() || '';
    return (
      medico.id.toString().includes(term) ||
      medico.dni.toLowerCase().includes(term) ||
      medico.nombre.toLowerCase().includes(term) ||
      especialidadNombre.includes(term)
    );
  });

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'DNI', key: 'dni' },
    { label: 'Nombre', key: 'nombre' },
    { label: 'Especialidad', key: 'especialidadNombre' },
    { label: 'Email', key: 'email' },
    { label: 'Teléfono', key: 'telefono' },
  ];

  const getEspecialidadNombre = (id) => {
    const esp = mockEspecialidades.find(e => e.id === parseInt(id));
    return esp ? esp.nombre : '';
  };

  const handleDelete = (medico) => {
    if (confirm(`¿Eliminar a ${medico.nombre}?`)) {
      setMedicos(medicos.filter(m => m.id !== medico.id));
    }
  };

  const handleEdit = (medico) => {
    setEditing(medico.id);
    setFormData({
      nombre: medico.nombre,
      dni: medico.dni,
      especialidadId: medico.especialidadId,
      email: medico.email,
      telefono: medico.telefono
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const especialidadNombre = getEspecialidadNombre(formData.especialidadId);
    if (editing) {
      setMedicos(medicos.map(m => m.id === editing ? {
        ...m,
        ...formData,
        especialidadNombre
      } : m));
    } else {
      const newId = Math.max(...medicos.map(m => m.id), 0) + 1;
      setMedicos([...medicos, {
        id: newId,
        ...formData,
        especialidadNombre
      }]);
    }
    setShowModal(false);
    setEditing(null);
    setFormData({ nombre: '', dni: '', especialidadId: '', email: '', telefono: '' });
  };

  const actions = [
    { icon: <FaEdit />, label: '', className: 'edit', handler: handleEdit },
    { icon: <FaTrash />, label: '', className: 'delete', handler: handleDelete },
  ];

  // Preparar datos para la tabla: incluir especialidadNombre
  const tableData = filteredMedicos.map(m => ({
    ...m,
    especialidadNombre: getEspecialidadNombre(m.especialidadId)
  }));

  return (
    <div>
      <div className="page-header">
        <h1>Médicos</h1>
        <button className="btn-primary" onClick={() => { setEditing(null); setFormData({ nombre: '', dni: '', especialidadId: '', email: '', telefono: '' }); setShowModal(true); }}>
          <FaPlus /> Nuevo Médico
        </button>
      </div>

      {/* Buscador moderno */}
      <div className="search-container">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="🔍 Buscar por ID, DNI, nombre o especialidad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <Card>
        {tableData.length === 0 ? (
          <div className="no-results">No se encontraron resultados</div>
        ) : (
          <Table columns={columns} data={tableData} actions={actions} />
        )}
      </Card>

      {/* Modal - sin cambios excepto campo DNI */}
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
                <label>DNI</label>
                <input value={formData.dni} onChange={e => setFormData({ ...formData, dni: e.target.value })} required />
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
  );
};

export default Medicos;