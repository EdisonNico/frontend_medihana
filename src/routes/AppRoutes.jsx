import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Layout from '../components/Layout'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Pacientes from '../pages/Pacientes'
import Medicos from '../pages/Medicos'
import Especialidades from '../pages/Especialidades'
import Consultorios from '../pages/Consultorios'
import Citas from '../pages/Citas'
import Historial from '../pages/Historial'
import Facturas from '../pages/Facturas'
import Pagos from '../pages/Pagos'
import Reportes from '../pages/Reportes'

const PrivateRoute = ({ children }) => {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="pacientes" element={<Pacientes />} />
        <Route path="medicos" element={<Medicos />} />
        <Route path="especialidades" element={<Especialidades />} />
        <Route path="consultorios" element={<Consultorios />} />
        <Route path="citas" element={<Citas />} />
        <Route path="historial" element={<Historial />} />
        <Route path="facturas" element={<Facturas />} />
        <Route path="pagos" element={<Pagos />} />
        <Route path="reportes" element={<Reportes />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes