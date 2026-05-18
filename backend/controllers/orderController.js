const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');

// @desc    Create new order object database document array
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No items generated into order block');
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id, // Relink specific id back to original mapping
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json({ success: true, data: createdOrder });
  }
});

// @desc    Get logged in user previous orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json({ success: true, data: orders });
});

// @desc    Get order specific details
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order && (req.user.isAdmin || order.user._id.equals(req.user._id))) {
    res.json({ success: true, data: order });
  } else {
    res.status(404);
    throw new Error('Invalid order block ID or lack of permissions');
  }
});

// @desc    Admin Only Get all massive orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json({ success: true, data: orders });
});

// @desc    Admin Only Mark order physical shipment status
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    
    // Simulate payment resolution on delivery
    if(!order.isPaid) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = { status: "Resolved automatically by Shipment" }
    }

    const updatedOrder = await order.save();
    res.json({ success: true, data: updatedOrder });
  } else {
    res.status(404);
    throw new Error('Order shipment status failed. Not Found.');
  }
});

module.exports = {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered
};
