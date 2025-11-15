import { Navigate } from "react-router-dom"
import { IS_LOGGED_KEY } from "../utils/constants"
import type { JSX } from "react"

export function ProtectedRoute({ children } : { children: JSX.Element }) {
  const isLogged = Boolean(localStorage.getItem(IS_LOGGED_KEY))

  return isLogged ? children : <Navigate to="/login" replace />
}
