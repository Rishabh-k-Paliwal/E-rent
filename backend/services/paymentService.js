const razorpay = require('../config/payment');
const crypto = require('crypto');

// Create payment order
const createPaymentOrder = async (amount, bookingId) => {
  try {
    const options = {
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `booking_${bookingId}`,
      notes: {
        bookingId: bookingId.toString(),
      },
    };

    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    throw new Error(`Payment order creation failed: ${error.message}`);
  }
};

// Verify payment signature
const verifyPaymentSignature = (orderId, paymentId, signature) => {
  const body = orderId + '|' + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  return expectedSignature === signature;
};

// Fetch payment details
const getPaymentDetails = async (paymentId) => {
  try {
    const payment = await razorpay.payments.fetch(paymentId);
    return payment;
  } catch (error) {
    throw new Error(`Failed to fetch payment details: ${error.message}`);
  }
};

// Initiate refund
const initiateRefund = async (paymentId, amount) => {
  try {
    const refund = await razorpay.payments.refund(paymentId, {
      amount: amount * 100, // Convert to paise
    });
    return refund;
  } catch (error) {
    throw new Error(`Refund failed: ${error.message}`);
  }
};

module.exports = {
  createPaymentOrder,
  verifyPaymentSignature,
  getPaymentDetails,
  initiateRefund,
};