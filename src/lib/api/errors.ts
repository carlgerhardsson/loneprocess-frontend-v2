/**
 * API Error Handling
 * Custom error classes and error handling utilities
 */

import { AxiosError } from 'axios'

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: unknown
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export class NetworkError extends APIError {
  constructor(message = 'Network error - please check your connection') {
    super(message)
    this.name = 'NetworkError'
  }
}

export class AuthenticationError extends APIError {
  constructor(message = 'Authentication failed - please log in again') {
    super(message, 401)
    this.name = 'AuthenticationError'
  }
}

export class NotFoundError extends APIError {
  constructor(message = 'Resource not found') {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}

export class ValidationError extends APIError {
  constructor(message = 'Validation failed', data?: unknown) {
    super(message, 422, data)
    this.name = 'ValidationError'
  }
}

export class RateLimitError extends APIError {
  constructor(message = 'Too many requests - please wait and try again') {
    super(message, 429)
    this.name = 'RateLimitError'
  }
}

export class ServerError extends APIError {
  constructor(message = 'Server error - please try again later') {
    super(message, 500)
    this.name = 'ServerError'
  }
}

/**
 * Convert Axios error to custom API error
 */
export function handleAPIError(error: unknown): APIError {
  if (error instanceof APIError) {
    return error
  }

  if (error instanceof AxiosError) {
    const status = error.response?.status
    const message = error.response?.data?.message || error.message

    // Network errors
    if (!error.response) {
      return new NetworkError()
    }

    // HTTP status code errors
    switch (status) {
      case 401:
      case 403:
        return new AuthenticationError(message)
      case 404:
        return new NotFoundError(message)
      case 422:
        return new ValidationError(message, error.response?.data)
      case 429:
        return new RateLimitError(message)
      case 500:
      case 502:
      case 503:
      case 504:
        return new ServerError(message)
      default:
        return new APIError(message, status, error.response?.data)
    }
  }

  // Unknown error
  return new APIError(error instanceof Error ? error.message : 'An unexpected error occurred')
}
