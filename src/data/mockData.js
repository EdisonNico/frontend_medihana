export const mockPacientes = [
  { id: 1, nombre: 'Ana García', email: 'ana@mail.com', telefono: '555-0101', direccion: 'Av. Principal 123' },
  { id: 2, nombre: 'Carlos Ruiz', email: 'carlos@mail.com', telefono: '555-0102', direccion: 'Calle 5 #20' },
  { id: 3, nombre: 'María Pérez', email: 'maria@mail.com', telefono: '555-0103', direccion: 'Av. Los Pinos 45' },
]

export const mockMedicos = [
  { id: 1, nombre: 'Dr. López', especialidadId: 1, email: 'lopez@medihana.com', telefono: '555-0201' },
  { id: 2, nombre: 'Dra. Martínez', especialidadId: 2, email: 'martinez@medihana.com', telefono: '555-0202' },
  { id: 3, nombre: 'Dr. Sánchez', especialidadId: 3, email: 'sanchez@medihana.com', telefono: '555-0203' },
]

export const mockEspecialidades = [
  { id: 1, nombre: 'Cardiología', descripcion: 'Enfermedades del corazón' },
  { id: 2, nombre: 'Pediatría', descripcion: 'Atención de niños' },
  { id: 3, nombre: 'Neurología', descripcion: 'Trastornos del sistema nervioso' },
]

export const mockConsultorios = [
  { id: 1, nombre: 'Consultorio A', ubicacion: 'Piso 1, ala norte', telefono: '555-0301' },
  { id: 2, nombre: 'Consultorio B', ubicacion: 'Piso 2, ala sur', telefono: '555-0302' },
]

export const mockCitas = [
  { id: 1, pacienteId: 1, medicoId: 1, fecha: '2025-03-20', hora: '10:00', estado: 'Confirmada' },
  { id: 2, pacienteId: 2, medicoId: 2, fecha: '2025-03-20', hora: '11:30', estado: 'Pendiente' },
  { id: 3, pacienteId: 3, medicoId: 3, fecha: '2025-03-21', hora: '09:00', estado: 'Confirmada' },
]

export const mockHistorial = [
  { id: 1, pacienteId: 1, fecha: '2025-03-10', diagnostico: 'Chequeo general', tratamiento: 'Ninguno', notas: 'Paciente sano' },
  { id: 2, pacienteId: 2, fecha: '2025-03-12', diagnostico: 'Dolor de cabeza', tratamiento: 'Paracetamol', notas: 'Reposo relativo' },
]

export const mockFacturas = [
  { id: 1, pacienteId: 1, monto: 150, fecha: '2025-03-15', estado: 'Pagado', descripcion: 'Consulta cardiología' },
  { id: 2, pacienteId: 2, monto: 200, fecha: '2025-03-16', estado: 'Pendiente', descripcion: 'Exámenes' },
  { id: 3, pacienteId: 3, monto: 90, fecha: '2025-03-17', estado: 'Pagado', descripcion: 'Consulta pediatría' },
]

export const mockPagos = [
  { id: 1, facturaId: 1, monto: 150, fecha: '2025-03-16', metodo: 'Tarjeta' },
  { id: 2, facturaId: 3, monto: 90, fecha: '2025-03-18', metodo: 'Efectivo' },
]

