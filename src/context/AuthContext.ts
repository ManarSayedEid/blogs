import { createContext } from "react"

type AuthContextType = {
    isLogged: boolean
    setIsLogged: (value: boolean) => void
}

export const DEFAULT_AUTH_CONTEXT: AuthContextType = {
    isLogged: false,
    setIsLogged: () => { },
}

export const AuthContext = createContext<AuthContextType>(DEFAULT_AUTH_CONTEXT)

