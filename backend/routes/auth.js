const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const {
  registerValidation,
  loginValidation,
  validate,
} = require('../utils/validators');

// @route   POST /api/auth/register
router.post('/register', registerValidation, validate, register);

// @route   POST /api/auth/login
router.post('/login', loginValidation, validate, login);

// @route   GET /api/auth/me
router.get('/me', protect, getMe);

module.exports = router;