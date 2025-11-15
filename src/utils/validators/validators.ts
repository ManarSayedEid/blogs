export function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function validatePassword(value: string): boolean {
  const min = value.length >= 8
  const lower = /[a-z]/.test(value)
  const upper = /[A-Z]/.test(value)
  const number = /[0-9]/.test(value)
  const special = /[^A-Za-z0-9]/.test(value)
  return min && lower && upper && number && special
}
