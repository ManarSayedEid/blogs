import { vi, beforeEach, describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import RegisterForm from './RegisterForm'
import { AuthContext } from '../../context/AuthContext'
import { userExists, addUser, login } from '../../utils/authStorage/authStorage'

vi.mock('../../utils/authStorage/authStorage', () => ({
    userExists: vi.fn(),
    addUser: vi.fn(),
    login: vi.fn(),
}))

const userExistsMock = vi.mocked(userExists)
const addUserMock = vi.mocked(addUser)
const loginMock = vi.mocked(login)  

const renderForm = (setIsLogged = () => { }) =>
    render(
        <AuthContext.Provider value={{ isLogged: false, setIsLogged }}>
            <RegisterForm />
        </AuthContext.Provider>
    )


describe('RegisterForm', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('shows validation errors when fields are empty', async () => {
        renderForm()

        await userEvent.click(screen.getByRole('button', { name: /create account/i }))

        expect(screen.getByText(/Email is required/i)).toBeInTheDocument()
        expect(screen.getByText(/Password is required/i)).toBeInTheDocument()
        expect(screen.getByText(/Please confirm your password/i)).toBeInTheDocument()
    })

    it('shows general error if user already exists', async () => {
        userExistsMock.mockReturnValue(true)

        renderForm()

        await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com')
        await userEvent.type(screen.getByLabelText('Password'), 'Password1!')
        await userEvent.type(screen.getByLabelText(/confirm password/i), 'Password1!')
        await userEvent.click(screen.getByRole('button', { name: /create account/i }))

        expect(screen.getByText(/User already exists/i)).toBeInTheDocument()
    })

    it('calls addUser, login and setIsLogged on successful registration', async () => {
        userExistsMock.mockReturnValue(false)
        const setIsLogged = vi.fn()

        renderForm(setIsLogged)

        await userEvent.type(screen.getByLabelText(/email/i), 'new@example.com')
        await userEvent.type(screen.getByLabelText('Password'), 'Password1!')
        await userEvent.type(screen.getByLabelText(/confirm password/i), 'Password1!')
        await userEvent.click(screen.getByRole('button', { name: /create account/i }))

        expect(addUserMock).toHaveBeenCalledWith('new@example.com', 'Password1!')
        expect(loginMock).toHaveBeenCalledWith()
        expect(setIsLogged).toHaveBeenCalledWith(true)
    })
})
