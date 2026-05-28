// src/data/mockData.js

export const mockPacientes = [
  { id: 1, dni: '12345678A', nombre: 'Ana García', email: 'ana@mail.com', telefono: '555-0101', direccion: 'Av. Principal 123' },
  { id: 2, dni: '87654321B', nombre: 'Carlos Ruiz', email: 'carlos@mail.com', telefono: '555-0102', direccion: 'Calle 5 #20' },
  { id: 3, dni: '11223344C', nombre: 'María Pérez', email: 'maria@mail.com', telefono: '555-0103', direccion: 'Av. Los Pinos 45' },
];

export const mockMedicos = [
  { id: 1, dni: '11111111X', nombre: 'Dr. López', especialidadId: 1, especialidadNombre: 'Cardiología', email: 'lopez@medihana.com', telefono: '555-0201' },
  { id: 2, dni: '22222222Y', nombre: 'Dra. Martínez', especialidadId: 2, especialidadNombre: 'Pediatría', email: 'martinez@medihana.com', telefono: '555-0202' },
  { id: 3, dni: '33333333Z', nombre: 'Dr. Sánchez', especialidadId: 3, especialidadNombre: 'Neurología', email: 'sanchez@medihana.com', telefono: '555-0203' },
];

export const mockEspecialidades = [
  { id: 1, nombre: 'Cardiología', descripcion: 'Enfermedades del corazón' },
  { id: 2, nombre: 'Pediatría', descripcion: 'Atención de niños' },
  { id: 3, nombre: 'Neurología', descripcion: 'Trastornos del sistema nervioso' },
];

export const mockConsultorios = [
  { id: 1, nombre: 'Consultorio A', ubicacion: 'Piso 1, ala norte', telefono: '555-0301' },
  { id: 2, nombre: 'Consultorio B', ubicacion: 'Piso 2, ala sur', telefono: '555-0302' },
];

export const mockCitas = [
  { id: 1, pacienteId: 1, medicoId: 1, fecha: '2025-03-20', hora: '10:00', estado: 'Confirmada' },
  { id: 2, pacienteId: 2, medicoId: 2, fecha: '2025-03-20', hora: '11:30', estado: 'Pendiente' },
  { id: 3, pacienteId: 3, medicoId: 3, fecha: '2025-03-21', hora: '09:00', estado: 'Confirmada' },
];

export const mockHistorial = [
  { id: 1, pacienteId: 1, fecha: '2025-03-10', diagnostico: 'Chequeo general', tratamiento: 'Ninguno', notas: 'Paciente sano' },
  { id: 2, pacienteId: 2, fecha: '2025-03-12', diagnostico: 'Dolor de cabeza', tratamiento: 'Paracetamol', notas: 'Reposo relativo' },
];

export const mockFacturas = [
  { id: 1, pacienteId: 1, monto: 150, fecha: '2025-03-15', estado: 'Pagado', descripcion: 'Consulta cardiología' },
  { id: 2, pacienteId: 2, monto: 200, fecha: '2025-03-16', estado: 'Pendiente', descripcion: 'Exámenes' },
  { id: 3, pacienteId: 3, monto: 90, fecha: '2025-03-17', estado: 'Pagado', descripcion: 'Consulta pediatría' },
];

export const mockPagos = [
  { id: 1, facturaId: 1, monto: 150, fecha: '2025-03-16', metodo: 'Tarjeta' },
  { id: 2, facturaId: 3, monto: 90, fecha: '2025-03-18', metodo: 'Efectivo' },
];