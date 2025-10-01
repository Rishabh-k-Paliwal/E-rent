const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getBooking,
  updateBooking,
  cancelBooking,
  paymentWebhook,
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');
const { bookingValidation, validate } = require('../utils/validators');

// Webhook route (no auth required - called by Razorpay)
router.post('/payment-webhook', paymentWebhook);

// Protected routes
router.post('/', protect, bookingValidation, validate, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get('/:id', protect, getBooking);
router.put('/:id', protect, updateBooking);
router.delete('/:id', protect, cancelBooking);

module.exports = router;