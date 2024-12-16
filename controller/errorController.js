const CustomError = require("../utils/customError")
const createDevError = (error, res) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error
  })
}
const createProdError = (error, res) => {
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      ...(error.errors && { errors: error.errors })
    })
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong! Please try again later'
    })
  }
}

const getValidationError = (error) => {
  const validationErrors = (error.errors.map((err) => ({
    field: err.path,
    message: err.message
  })))
  return new CustomError("Validation failed", 400, validationErrors)
}

const getUniqeKeyError = (error) => {
  return new CustomError(error.errors[0].message, 409)
}

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500
  error.status = error.status || 'error'

  if (process.env.NODE_ENV === "development") {
    createDevError(error, res)
  } else if (process.env.NODE_ENV === "production") {
    if (error.name === "SequelizeValidationError") error = getValidationError(error)
    else if (error.name === "SequelizeUniqueConstraintError") error = getUniqeKeyError(error)
    createProdError(error, res)
  }
}