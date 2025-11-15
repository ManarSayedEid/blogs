import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmail, validatePassword } from '../utils/validators'
import { VALIDATION_MESSAGES } from '../utils/constants'
import { addUser, checkExistance } from '../utils/authStorage'

export default function RegisterForm() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [emailError, setEmailError] = useState<string | null>(null)
    const [passwordError, setPasswordError] = useState<string | null>(null)
    const [confirmError, setConfirmError] = useState<string | null>(null)
    const [generalError, setGeneralError] = useState<string | null>(null)

    const resetErrors = () => {
        setEmailError(null)
        setPasswordError(null)
        setConfirmError(null)
        setGeneralError(null)
    }

    const validateFormInputs = (): void => {
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

        if (!confirmPassword) {
            setConfirmError(VALIDATION_MESSAGES.CONFIRM_PASSWORD_REQUIRED)
        } else if (password !== confirmPassword) {
            setConfirmError(VALIDATION_MESSAGES.CONFIRM_PASSWORD_MISMATCH)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        resetErrors()

        validateFormInputs()

        if (emailError || passwordError || confirmError) {
            return
        }

        // This MUST be done via secure backend API, this is just for demo purposes
        if (checkExistance(email, password)) {
            setGeneralError('User already exists. Please login.')
            return
        }

        addUser(email, password)
        navigate('/dashboard')
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

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${confirmError ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-500'}`}
                />
                {confirmError && <p className="mt-1 text-sm text-red-600">{confirmError}</p>}
            </div>

            {generalError && <p className="text-sm text-red-600 text-center">{generalError}</p>}

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
                Create Account
            </button>
        </form>
    )
}