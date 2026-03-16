/**
 * Authentication & User Types
 */

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  permissions: Permission[]
  createdAt: string
  lastLogin: string | null
}

export type UserRole = 'admin' | 'user' | 'viewer'

export type Permission =
  | 'activities:read'
  | 'activities:write'
  | 'activities:delete'
  | 'periods:read'
  | 'periods:write'
  | 'periods:delete'
  | 'users:read'
  | 'users:write'
  | 'users:delete'

export interface AuthSession {
  token: string
  expiresAt: string
  refreshToken: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthState {
  user: User | null
  session: AuthSession | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
