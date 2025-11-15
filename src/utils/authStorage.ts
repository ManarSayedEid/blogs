import { USERS_KEY, IS_LOGGED_KEY } from './constants'

type User = {
    email: string
    password: string
}


// ⚠️🚨NOTE: In a real app these must be performed by a secure backend, this is just for demo purposes⚠️🚨

/**
 * Retrieve users from localStorage or initialize as empty array
 */
export function getUsers(): User[] {
    const currentUsers = localStorage.getItem(USERS_KEY)
    return currentUsers ? JSON.parse(currentUsers) : []
}

/**
 * Check if a user with the given email already exists
 */
export function userExists(email: string): boolean {
    const currentUsers = getUsers()
    return currentUsers.some((user) => user.email === email)
}

/**
 * Add a new user to the localstorage
 */
export function addUser(email: string, password: string) {
    const currentUsers = getUsers()
    currentUsers.push({ email, password })
    localStorage.setItem(USERS_KEY, JSON.stringify(currentUsers))
}

/**
 * Validate credentials against stored users (authentication)
 * Returns `true` when email+password match an existing user
 */
export function authenticate(email: string, password: string): boolean {
    const currentUsers = getUsers()
    return currentUsers.some((user) => user.email === email && user.password === password)
}

/**
 * Set a persisted logged-in flag in localStorage.
 */
export function login() {
    localStorage.setItem(IS_LOGGED_KEY, 'true')
}

/**
 * Clear a persisted logged-in flag from localStorage.
 */
export function logout() {
    localStorage.removeItem(IS_LOGGED_KEY)
}
