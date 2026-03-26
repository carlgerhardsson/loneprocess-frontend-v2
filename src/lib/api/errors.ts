/**
 * API Error Handling
 * Felklasser med svenska meddelanden och mappning från HTTP-statuskoder
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
  constructor(message = 'Kan inte ansluta till systemet. Kontrollera din nätverksanslutning.') {
    super(message)
    this.name = 'NetworkError'
  }
}

export class AuthenticationError extends APIError {
  constructor(message = 'Din session har gått ut. Laddar om...') {
    super(message, 401)
    this.name = 'AuthenticationError'
  }
}

export class NotFoundError extends APIError {
  constructor(message = 'Data hittades inte.') {
    super(message, 404)
    this.name = 'NotFoundError'
  }
}

export class ValidationError extends APIError {
  constructor(message = 'Ogiltiga uppgifter. Kontrollera dina inmatningar.', data?: unknown) {
    super(message, 422, data)
    this.name = 'ValidationError'
  }
}

export class RateLimitError extends APIError {
  constructor(message = 'För många förfrågningar. Vänta en stund och försök igen.') {
    super(message, 429)
    this.name = 'RateLimitError'
  }
}

export class ServerError extends APIError {
  constructor(message = 'Serverfel. Försök igen senare.') {
    super(message, 500)
    this.name = 'ServerError'
  }
}

/**
 * Omvandlar Axios-fel till anpassad APIError med svenska meddelanden.
 */
export function handleAPIError(error: unknown): APIError {
  if (error instanceof APIError) {
    return error
  }

  if (error instanceof AxiosError) {
    const status = error.response?.status

    if (!error.response) {
      return new NetworkError()
    }

    switch (status) {
      case 401:
      case 403:
        return new AuthenticationError()
      case 404:
        return new NotFoundError()
      case 422:
        return new ValidationError(undefined, error.response?.data)
      case 429:
        return new RateLimitError()
      case 500:
      case 502:
      case 503:
      case 504:
        return new ServerError()
      default:
        return new APIError(
          `Ett fel uppstod (${status ?? 'okänd statuskod'}).`,
          status,
          error.response?.data
        )
    }
  }

  return new APIError(
    error instanceof Error ? error.message : 'Ett oväntat fel uppstod.'
  )
}

/**
 * Returnerar ett användarvänligt svenskt felmeddelande för ett fel.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof APIError) {
    return error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return 'Ett oväntat fel uppstod.'
}
