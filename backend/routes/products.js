const express = require('express');
const router = express.Router();
const {
  getProducts,
  searchProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roleCheck');
const { productValidation, validate } = require('../utils/validators');

// Public routes
router.get('/', getProducts);
router.get('/search', searchProducts);
router.get('/:id', getProduct);

// Protected routes (owner/admin only)
router.post(
  '/',
  protect,
  authorize('owner', 'admin'),
  productValidation,
  validate,
  createProduct
);

router.put(
  '/:id',
  protect,
  authorize('owner', 'admin'),
  updateProduct
);

router.delete(
  '/:id',
  protect,
  authorize('owner', 'admin'),
  deleteProduct
);

module.exports = router;