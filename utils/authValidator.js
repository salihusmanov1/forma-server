const { body } = require('express-validator');

const validateLogin = [
  body('email').notEmpty().withMessage('Email is required').bail().isEmail().withMessage('Email must be a valid email'),
  body('password').notEmpty().withMessage('Password is required').bail().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

module.exports = { validateLogin }