import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';

export default function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">Create Account</h1>

                <RegisterForm />

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-500 hover:underline font-semibold">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}
