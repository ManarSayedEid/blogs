import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
    const { isLogged } = useContext(AuthContext)
    if (isLogged) return <Navigate to="/dashboard" replace />

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
                <LoginForm />
            </div>
        </div>
    )
}
