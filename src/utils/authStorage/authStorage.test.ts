import { describe, it, expect, beforeEach } from 'vitest'
import { getUsers, userExists, addUser, authenticate, login, logout } from './authStorage'
import { USERS_KEY, IS_LOGGED_KEY } from '../../constants'

describe('authStorage utilities', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    describe('getUsers', () => {
        it('should return empty array if no users stored', () => {
            expect(getUsers()).toEqual([])
        })

        it('should return stored users', () => {
            const user = { email: 'test@example.com', password: 'Password1!' }
            localStorage.setItem(USERS_KEY, JSON.stringify([user]))
            expect(getUsers()).toEqual([user])
        })
    })

    describe('addUser', () => {
        it('should add multiple users', () => {
            addUser('user1@example.com', 'Password1!')
            addUser('user2@example.com', 'Password2!')
            const users = getUsers()
            expect(users).toHaveLength(2)
        })
    })

    describe('userExists', () => {
        it('should return false if user does not exist', () => {
            expect(userExists('notexist@example.com')).toBe(false)
        })

        it('should return true if user exists', () => {
            addUser('test@example.com', 'Password1!')
            expect(userExists('test@example.com')).toBe(true)
        })
    })

    describe('authenticate', () => {
        beforeEach(() => {
            addUser('test@example.com', 'Password1!')
        })

        it('should return true for correct email and password', () => {
            expect(authenticate('test@example.com', 'Password1!')).toBe(true)
        })

        it('should return false for incorrect password', () => {
            expect(authenticate('test@example.com', 'WrongPassword1!')).toBe(false)
        })
    })

    describe('login and logout', () => {
        it('should set logged-in flag', () => {
            login()
            expect(localStorage.getItem(IS_LOGGED_KEY)).toBe('true')
        })

        it('should remove logged-in flag', () => {
            login()
            logout()
            expect(localStorage.getItem(IS_LOGGED_KEY)).toBeNull()
        })
    })
})
