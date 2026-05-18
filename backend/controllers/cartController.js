const asyncHandler = require('express-async-handler');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get logged in user cart
// @route   GET /api/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });
  
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, cartItems: [] });
  }

  res.json({ success: true, data: cart });
});

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found mapping to Cart request');
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, cartItems: [] });
  }

  const existingItemIndex = cart.cartItems.findIndex(
    (item) => item.product.toString() === productId
  );

  if (existingItemIndex >= 0) {
    // If it exists in the array, push up the count
    cart.cartItems[existingItemIndex].quantity += quantity || 1;
  } else {
    // Append completely new structural item to array
    cart.cartItems.push({
      product: product._id,
      title: product.title,
      image: product.images[0],
      price: product.price,
      discount: product.discount,
      quantity: quantity || 1,
    });
  }

  await cart.save();
  res.json({ success: true, data: cart });
});

// @desc    Update cart item quantity structure
// @route   PUT /api/cart/:id
// @access  Private
const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const productId = req.params.id;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("No cart session found for this user");
  }

  const existingItemIndex = cart.cartItems.findIndex(
    (item) => item.product.toString() === productId
  );

  if (existingItemIndex >= 0) {
    cart.cartItems[existingItemIndex].quantity = quantity;
    await cart.save();
    res.json({ success: true, data: cart });
  } else {
    res.status(404);
    throw new Error('Cart Item not found to update');
  }
});

// @desc    Remove an item or absolutely clear cart
// @route   DELETE /api/cart/:id
// @access  Private
const removeCartItem = asyncHandler(async (req, res) => {
  const productId = req.params.id;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error('No user cart found to delete items from');
  }

  // Passing literal strings matching 'clear' will purge total Cart
  if (productId === 'clear') {
    cart.cartItems = [];
  } else {
    cart.cartItems = cart.cartItems.filter(
      (item) => item.product.toString() !== productId
    );
  }

  await cart.save();
  res.json({ success: true, message: 'Cart cleaned updated', data: cart });
});

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
};
