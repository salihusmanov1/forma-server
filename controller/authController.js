const { Users } = require("../models")
const bcrypt = require('bcryptjs');
const { generateAccessToken, clearToken } = require("../utils/jwtTokenGenerator");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const CustomError = require("../utils/customError");
const { validationResult } = require('express-validator');

const registerUser = asyncErrorHandler(async (req, res, next) => {
  const newUser = await Users.create(req.body);
  generateAccessToken(res, newUser.id);
  res.status(201).json({
    message: 'Your account has been created successfully',
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    },
  });
})

const loginUser = asyncErrorHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new CustomError("Validation failed", 400, {
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg
      }))
    }))
  }
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email } });
  if (!user) {
    next(new CustomError('User not found. Please check your email and try again.', 404));
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(new CustomError('Invalid password. Please try again.', 400));
  }
  generateAccessToken(res, user.id)
  return res.status(200).json({
    message: "You're logged in!",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
})

const logoutUser = (req, res, next) => {
  clearToken(res)
  return res.status(200).json({ message: "You'are logged out" });
}

module.exports = { registerUser, loginUser, logoutUser };
