import { useContext } from "react"
import Navbar from "../components/NavBar"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

export default function Dashboard() {
  const { isLogged } = useContext(AuthContext)
  if (!isLogged) return <Navigate to="/login" replace />

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Blogs</h1>
        <p className="text-gray-600">
          content will go here.
        </p>
      </div>
    </div>
  )
}
