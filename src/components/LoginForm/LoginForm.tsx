import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { validateEmail, validatePassword } from '../../utils/validators/validators'
import { VALIDATION_MESSAGES } from '../../constants'
import { authenticate, login } from '../../utils/authStorage/authStorage'
import { AuthContext } from '../../context/AuthContext'

export default function LoginForm() {
    const { setIsLogged } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)
    const [generalError, setGeneralError] = useState<string | null>(null)

    const resetErrors = () => {
        setEmailError(null)
        setPasswordError(null)
        setGeneralError(null)
    }

    const validateFormInputs = () => {
        if (!email) {
            setEmailError(VALIDATION_MESSAGES.EMAIL_REQUIRED)
        } else if (!validateEmail(email)) {
            setEmailError(VALIDATION_MESSAGES.EMAIL_INVALID)
        }

        if (!password) {
            setPasswordError(VALIDATION_MESSAGES.PASSWORD_REQUIRED)
        } else if (!validatePassword(password)) {
            setPasswordError(VALIDATION_MESSAGES.PASSWORD_INVALID)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        resetErrors()
        validateFormInputs()

        if (emailError || passwordError) {
            return
        }

        if (!authenticate(email, password)) {
            setGeneralError('Invalid email or password')
            return
        }
        login()
        setIsLogged(true)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${emailError ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                />
                {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${passwordError ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                />
                {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
            </div>

            {generalError && <p className="text-sm text-red-600 text-center">{generalError}</p>}

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
            >
                Sign In
            </button>

            <p className="text-center text-sm text-gray-600">
                Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link>
            </p>
        </form>
    )
}
