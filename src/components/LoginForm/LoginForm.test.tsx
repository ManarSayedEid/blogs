import { vi, beforeEach, describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import LoginForm from './LoginForm'
import { AuthContext } from '../../context/AuthContext'
import { authenticate, login } from '../../utils/authStorage/authStorage'

vi.mock('../../utils/authStorage/authStorage', () => ({
  authenticate: vi.fn(),
  login: vi.fn(),
}))

const authenticateMock = vi.mocked(authenticate)
const loginMock = vi.mocked(login)

function renderWithAuth(ui: React.ReactNode, contextValue: any = { isLogged: false, setIsLogged: () => {} }) {
  return render(
    <MemoryRouter>
      <AuthContext.Provider value={contextValue}>
        {ui}
      </AuthContext.Provider>
    </MemoryRouter>
  )
}

describe('LoginForm', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('shows validation errors for empty fields', async () => {
    renderWithAuth(<LoginForm />)

    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByText(/password is required/i)).toBeInTheDocument()
  })

  it('shows general error when authentication fails', async () => {
    authenticateMock.mockReturnValue(false)

    renderWithAuth(<LoginForm />)

    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'Password1!')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument()
  })

  it('calls login and setIsLogged on success', async () => {
    authenticateMock.mockReturnValue(true)
    const setIsLogged = vi.fn()

    renderWithAuth(<LoginForm />, { isLogged: false, setIsLogged })

    await userEvent.type(screen.getByLabelText(/email/i), 'user@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'Password1!')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))

    expect(loginMock).toHaveBeenCalledTimes(1)
    expect(setIsLogged).toHaveBeenCalledWith(true)
  })
})
