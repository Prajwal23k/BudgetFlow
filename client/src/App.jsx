import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login/Login'

function Register() {
  return <h1>Register Page</h1>
}

function Dashboard() {
  return <h1>Dashboard</h1>
}

function Expenses() {
  return <h1>Expenses</h1>
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

function NotFound() {
  return <h1>NotFound</h1>
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/income" element={<Income />} />
      <Route path="/budgets" element={<Budgets />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
