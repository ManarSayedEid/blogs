import { describe, it, expect } from 'vitest'
import { validateEmail, validatePassword } from './validators'

describe('validateEmail', () => {
    it('should return true for valid email addresses', () => {
        expect(validateEmail('user@example.com')).toBe(true)
        expect(validateEmail('test.email+tag@domain.co.uk')).toBe(true)
        expect(validateEmail('a@b.c')).toBe(true)
    })

    it('should return false for invalid email addresses', () => {
        expect(validateEmail('plainaddress')).toBe(false)
        expect(validateEmail('@example.com')).toBe(false)
        expect(validateEmail('user@')).toBe(false)
        expect(validateEmail('user @example.com')).toBe(false)
        expect(validateEmail('')).toBe(false)
    })
})

describe('validatePassword', () => {
    it('should return true for valid passwords (8+ chars, upper, lower, number, special)', () => {
        expect(validatePassword('Password1!')).toBe(true)
        expect(validatePassword('MyPass@123')).toBe(true)
        expect(validatePassword('SecureP@ss1')).toBe(true)
    })

    it('should return false for invalid passwords', () => {
        expect(validatePassword('Pass1!')).toBe(false)
        expect(validatePassword('password1!')).toBe(false)
        expect(validatePassword('PASSWORD1!')).toBe(false)
        expect(validatePassword('Password!')).toBe(false)
        expect(validatePassword('Password1')).toBe(false)
        expect(validatePassword('')).toBe(false)
    })
})
