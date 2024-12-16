class CustomError extends Error {
  constructor(message, statusCode, errors) {
    super(message)
    this.statusCode = statusCode
    this.status = "fail"
    this.errors = errors || null
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

module.exports = CustomError