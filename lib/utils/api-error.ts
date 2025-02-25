export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public errors?: Record<string, string[]>,
    public code?: string
  ) {
    super(message)
    this.name = 'APIError'
    Object.setPrototypeOf(this, APIError.prototype)
  }

  static badRequest(message: string, errors?: Record<string, string[]>) {
    return new APIError(400, message, errors, 'BAD_REQUEST')
  }

  static unauthorized(message = 'Unauthorized') {
    return new APIError(401, message, undefined, 'UNAUTHORIZED')
  }

  static forbidden(message = 'Forbidden') {
    return new APIError(403, message, undefined, 'FORBIDDEN')
  }

  static notFound(message = 'Not found') {
    return new APIError(404, message, undefined, 'NOT_FOUND')
  }

  static conflict(message: string) {
    return new APIError(409, message, undefined, 'CONFLICT')
  }

  static tooManyRequests(message = 'Too many requests') {
    return new APIError(429, message, undefined, 'TOO_MANY_REQUESTS')
  }

  static internal(message = 'Internal server error') {
    return new APIError(500, message, undefined, 'INTERNAL_SERVER_ERROR')
  }
}

export function handleAPIError(error: unknown) {
  if (error instanceof APIError) {
    return {
      success: false,
      message: error.message,
      errors: error.errors,
      code: error.code,
      statusCode: error.statusCode
    }
  }

  console.error('Unhandled error:', error)
  
  if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
      statusCode: 500,
      code: 'INTERNAL_SERVER_ERROR'
    }
  }

  return {
    success: false,
    message: 'An unexpected error occurred',
    statusCode: 500,
    code: 'INTERNAL_SERVER_ERROR'
  }
}

export function isAPIError(error: unknown): error is APIError {
  return error instanceof APIError
}