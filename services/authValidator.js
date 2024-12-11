const { body } = require('express-validator');

const validateRegister = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Email must be a valid email').notEmpty().withMessage('Email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').notEmpty().withMessage('Password is required'),
];

const validateLogin = [
  body('email').isEmail().withMessage('Email must be a valid email').notEmpty().withMessage('Email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').notEmpty().withMessage('Password is required'),
];

module.exports = { validateRegister, validateLogin }