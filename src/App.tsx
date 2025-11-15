import { Routes, Route } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContextProvider'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {

  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AuthContextProvider>
  )
}

export default App
