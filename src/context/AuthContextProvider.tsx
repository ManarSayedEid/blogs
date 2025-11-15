import { useEffect, useState } from "react"
import { IS_LOGGED_KEY } from "../utils/constants"
import { AuthContext } from "./AuthContext"
import Loader from "../components/Loader"

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [isLogged, setIsLogged] = useState<boolean | null>(null)

    useEffect(() => {
        try {
            setIsLogged(localStorage.getItem(IS_LOGGED_KEY) === 'true')
        } catch {
            setIsLogged(false)
        }
    }, [])

    if (isLogged === null) return <Loader /> 
    
    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    )
}