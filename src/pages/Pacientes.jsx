// src/pages/Pacientes.jsx
import React, { useState } from 'react';
import Table from '../components/Table';
import Card from '../components/Card';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import { mockPacientes } from '../data/mockData';
import '../styles/tables.css'; // Asegurar que los estilos de tabla se mantengan

const Pacientes = () => {
  const [pacientes, setPacientes] = useState(mockPacientes);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', dni: '', email: '', telefono: '', direccion: '' });

  // Filtrar pacientes según búsqueda en tiempo real (ID, DNI, nombre)
  const filteredPacientes = pacientes.filter(paciente => {
    const term = searchTerm.toLowerCase();
    return (
      paciente.id.toString().includes(term) ||
      paciente.dni.toLowerCase().includes(term) ||
      paciente.nombre.toLowerCase().includes(term)
    );
  });

  const columns = [
    { label: 'ID', key: 'id' },
    { label: 'DNI', key: 'dni' },
    { label: 'Nombre', key: 'nombre' },
    { label: 'Email', key: 'email' },
    { label: 'Teléfono', key: 'telefono' },
    { label: 'Dirección', key: 'direccion' },
  ];

  const handleDelete = (paciente) => {
    if (confirm(`¿Eliminar a ${paciente.nombre}?`)) {
      setPacientes(pacientes.filter(p => p.id !== paciente.id));
    }
  };

  const handleEdit = (paciente) => {
    setEditing(paciente.id);
    setFormData({
      nombre: paciente.nombre,
      dni: paciente.dni,
      email: paciente.email,
      telefono: paciente.telefono,
      direccion: paciente.direccion,
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      setPacientes(pacientes.map(p => p.id === editing ? { ...p, ...formData } : p));
    } else {
      const newId = Math.max(...pacientes.map(p => p.id), 0) + 1;
      setPacientes([...pacientes, { id: newId, ...formData }]);
    }
    setShowModal(false);
    setEditing(null);
    setFormData({ nombre: '', dni: '', email: '', telefono: '', direccion: '' });
  };

  const actions = [
    { icon: <FaEdit />, label: '', className: 'edit', handler: handleEdit },
    { icon: <FaTrash />, label: '', className: 'delete', handler: handleDelete },
  ];

  return (
    <div>
      <div className="page-header">
        <h1>Pacientes</h1>
        <button className="btn-primary" onClick={() => { setEditing(null); setFormData({ nombre: '', dni: '', email: '', telefono: '', direccion: '' }); setShowModal(true); }}>
          <FaPlus /> Nuevo Paciente
        </button>
      </div>

      {/* Buscador moderno */}
      <div className="search-container">
        <div className="search-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="🔍 Buscar por ID, DNI o nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <Card>
        {filteredPacientes.length === 0 ? (
          <div className="no-results">No se encontraron resultados</div>
        ) : (
          <Table columns={columns} data={filteredPacientes} actions={actions} />
        )}
      </Card>

      {/* Modal - sin cambios */}
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
                <label>DNI</label>
                <input value={formData.dni} onChange={e => setFormData({ ...formData, dni: e.target.value })} required />
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
  );
};

export default Pacientes;