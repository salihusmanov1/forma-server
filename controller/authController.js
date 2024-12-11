const { Users } = require("../models")
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator");
const generateAccessToken = require("../services/jwtTokenGenerator");

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed',
      errors: errors.array(),
    });
  }

  try {
    const { name, email, password } = req.body;
    const newUser = await Users.create({ name, email, password });
    generateAccessToken(res, newUser.id);
    res.status(201).json({
      message: 'Your account has been created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'This email address is already in use.' });
    }
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'User not found. Please check your email and try again.' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password. Please try again.' });
    }
    generateAccessToken(res, user.id)
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error)
  }
}

module.exports = { registerUser, loginUser };
