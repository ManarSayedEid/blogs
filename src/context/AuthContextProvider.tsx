import { useEffect, useState } from "react"
import { IS_LOGGED_KEY } from "../utils/constants"
import { AuthContext } from "./AuthContext"

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLogged, setIsLogged] = useState<boolean | null>(null)

    useEffect(() => {
        try {
            setIsLogged(localStorage.getItem(IS_LOGGED_KEY) === 'true')
        } catch {
            setIsLogged(false)
        }
    }, [])

    if (isLogged === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-blue-50">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading</h2>
                    <p className="text-gray-600">Please wait...</p>
                </div>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    )
}