const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getProductReviews,
  createProductReview,
  deleteProductReview,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getProducts).post(protect, admin, createProduct);

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

router
  .route('/:id/reviews')
  .get(getProductReviews);

router
  .route('/:id/review')
  .post(protect, createProductReview)
  .delete(protect, deleteProductReview);

module.exports = router;
