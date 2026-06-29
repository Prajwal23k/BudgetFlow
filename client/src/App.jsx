import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import ProtectedRoute from './components/common/ProtectedRoute'

function Register() {
  return <h1>Register Page</h1>
}

function Dashboard() {
  return <h1>Dashboard</h1>
}

function Expenses() {
  return <h1>Expenses Page</h1>
}

function Income() {
  return <h1>Income</h1>
}

function Budgets() {
  return <h1>Budgets</h1>
}

function Profile() {
  return <h1>Profile</h1>
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/expenses" element={<ProtectedRoute><Expenses /></ProtectedRoute>} />
      <Route path="/income" element={<ProtectedRoute><Income /></ProtectedRoute>} />
      <Route path="/budgets" element={<ProtectedRoute><Budgets /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
