import { USERS_KEY, IS_LOGGED_KEY } from './constants'

type User = {
    email: string
    password: string
}


export function getUsers(): User[] {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
}

// This MUST be done via secure backend API, this is just for demo purposes
export function checkExistance(email: string, password: string): boolean {
    const currentUsers = getUsers()
    return currentUsers.some((user) => user.email === email && user.password === password)
}

export function addUser(email: string, password: string) {
    const currentUsers = getUsers()
    currentUsers.push({ email, password })
    localStorage.setItem(USERS_KEY, JSON.stringify(currentUsers))
    localStorage.setItem(IS_LOGGED_KEY, 'true')
}

export function login() {
    localStorage.setItem(IS_LOGGED_KEY, 'true')
}

export function logout() {
    localStorage.setItem(IS_LOGGED_KEY, 'false')
}
