import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { logout } from "../utils/authStorage"

export default function Navbar() {
    const navigate = useNavigate()
    const { setIsLogged } = useContext(AuthContext)

    const handleLogout = () => {
        logout()
        setIsLogged(false)
        navigate('/login')
    }

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                <Link
                    to="/dashboard"
                    className="flex items-center gap-2 text-xl font-bold"
                >
                    <span>News</span>
                </Link>
                <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors duration-200 cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}
