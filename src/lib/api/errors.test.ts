import { describe, it, expect } from 'vitest'
import { AxiosError } from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import {
  handleAPIError,
  getErrorMessage,
  NetworkError,
  AuthenticationError,
  NotFoundError,
  RateLimitError,
  ServerError,
  APIError,
} from './errors'

function makeAxiosError(status?: number): AxiosError {
  const err = new AxiosError('test error')
  if (status !== undefined) {
    err.response = {
      status,
      data: {},
      headers: {},
      config: {} as InternalAxiosRequestConfig,
      statusText: String(status),
    }
  }
  return err
}

describe('handleAPIError', () => {
  it('returnerar NetworkError när inget response finns', () => {
    const result = handleAPIError(makeAxiosError())
    expect(result).toBeInstanceOf(NetworkError)
    expect(result.message).toContain('ansluta')
  })

  it('returnerar AuthenticationError för 401', () => {
    const result = handleAPIError(makeAxiosError(401))
    expect(result).toBeInstanceOf(AuthenticationError)
    expect(result.statusCode).toBe(401)
  })

  it('returnerar AuthenticationError för 403', () => {
    const result = handleAPIError(makeAxiosError(403))
    expect(result).toBeInstanceOf(AuthenticationError)
  })

  it('returnerar NotFoundError för 404', () => {
    const result = handleAPIError(makeAxiosError(404))
    expect(result).toBeInstanceOf(NotFoundError)
    expect(result.statusCode).toBe(404)
  })

  it('returnerar RateLimitError för 429', () => {
    const result = handleAPIError(makeAxiosError(429))
    expect(result).toBeInstanceOf(RateLimitError)
  })

  it('returnerar ServerError för 500', () => {
    const result = handleAPIError(makeAxiosError(500))
    expect(result).toBeInstanceOf(ServerError)
  })

  it('passerar igenom en befintlig APIError', () => {
    const original = new APIError('redan en api-error', 400)
    expect(handleAPIError(original)).toBe(original)
  })

  it('hanterar okända fel', () => {
    const result = handleAPIError('något konstigt')
    expect(result).toBeInstanceOf(APIError)
    expect(result.message).toContain('oväntat')
  })
})

describe('getErrorMessage', () => {
  it('returnerar meddelande från APIError', () => {
    expect(getErrorMessage(new APIError('testfel'))).toBe('testfel')
  })

  it('returnerar meddelande från vanligt Error', () => {
    expect(getErrorMessage(new Error('vanligt fel'))).toBe('vanligt fel')
  })

  it('returnerar fallback för okända värden', () => {
    expect(getErrorMessage(null)).toContain('oväntat')
  })
})
