// Date formatting helper
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// Calculate days between two dates
const calculateDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Format price to currency
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
};

// Generate random string
const generateRandomString = (length = 10) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Check if date is in past
const isPastDate = (date) => {
  return new Date(date) < new Date();
};

// Validate coordinates
const isValidCoordinates = (lng, lat) => {
  return (
    typeof lng === 'number' &&
    typeof lat === 'number' &&
    lng >= -180 &&
    lng <= 180 &&
    lat >= -90 &&
    lat <= 90
  );
};

// Sanitize user input
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};

// Paginate array
const paginate = (array, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  return {
    data: array.slice(startIndex, endIndex),
    page: Number(page),
    limit: Number(limit),
    total: array.length,
    pages: Math.ceil(array.length / limit),
  };
};

// Calculate booking price
const calculateBookingPrice = (pricePerDay, startDate, endDate) => {
  const days = calculateDays(startDate, endDate);
  return days * pricePerDay;
};

// Error response formatter
const errorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({
    success: false,
    error: message,
  });
};

// Success response formatter
const successResponse = (res, statusCode, data, message = null) => {
  const response = {
    success: true,
    data,
  };
  
  if (message) {
    response.message = message;
  }
  
  return res.status(statusCode).json(response);
};

module.exports = {
  formatDate,
  calculateDays,
  formatPrice,
  generateRandomString,
  isPastDate,
  isValidCoordinates,
  sanitizeInput,
  paginate,
  calculateBookingPrice,
  errorResponse,
  successResponse,
};