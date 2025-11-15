import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import Navbar from "../components/NavBar"
import News from "../components/News"

export default function Dashboard() {
  const { isLogged } = useContext(AuthContext)
  if (!isLogged) return <Navigate to="/login" replace />

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6">
        <News />
      </div>
    </div>
  )
}
