import { USERS, CREDENTIALS } from './data'
import type { User } from '@/types'

export function validateCredentials(email: string, password: string): User | null {
  const expectedPassword = CREDENTIALS[email]
  if (!expectedPassword || expectedPassword !== password) return null
  return USERS.find(u => u.email === email) || null
}

export function getUserById(id: string): User | null {
  return USERS.find(u => u.id === id) || null
}

export function getUserByEmail(email: string): User | null {
  return USERS.find(u => u.email === email) || null
}
