const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Fetch all products (with pagination, search, & filters)
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.pageSize) || 12; // default page size
  const page = Number(req.query.pageNumber) || 1;

  // Search keyword binding
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  // Category filtering
  const categoryFilter = req.query.category && req.query.category !== 'All' 
    ? { category: req.query.category } 
    : {};

  // Price filtering
  let priceFilter = {};
  if (req.query.minPrice || req.query.maxPrice) {
    priceFilter.price = {
      ...(req.query.minPrice && { $gte: Number(req.query.minPrice) }),
      ...(req.query.maxPrice && { $lte: Number(req.query.maxPrice) }),
    };
  }

  // Combine query filters
  const queryFilter = { ...keyword, ...categoryFilter, ...priceFilter };

  const count = await Product.countDocuments(queryFilter);
  
  // Use lean() query for raw performance optimization
  const products = await Product.find(queryFilter)
    .lean()
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({
    success: true,
    data: {
      products,
      page,
      pages: Math.ceil(count / pageSize),
      totalCount: count
    }
  });
});

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json({ success: true, data: product });
  } else {
    res.status(404);
    throw new Error('Product not found in database');
  }
});

// @desc    Admin Create generic product placeholder
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    title: 'Sample Product Skeleton',
    price: 0,
    user: req.user._id,
    images: ['/images/sample.jpg'],
    category: 'Draft',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample outline generated for admin modification'
  });

  const createdProduct = await product.save();
  res.status(201).json({ success: true, data: createdProduct });
});

// @desc    Admin Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const { title, price, description, images, category, countInStock, discount } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.title = title || product.title;
    product.price = price || product.price;
    product.description = description || product.description;
    product.images = images || product.images;
    product.category = category || product.category;
    product.countInStock = countInStock !== undefined ? countInStock : product.countInStock;
    product.discount = discount !== undefined ? discount : product.discount;

    const updatedProduct = await product.save();
    res.json({ success: true, data: updatedProduct });
  } else {
    res.status(404);
    throw new Error('Targeted product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();
    res.json({ success: true, message: 'Product fully removed from the database' });
  } else {
    res.status(404);
    throw new Error('Product failed to delete: Not found');
  }
});

// @desc    Get product reviews
// @route   GET /api/products/:id/reviews
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json({ success: true, data: product.reviews });
  } else {
    res.status(404);
    throw new Error('Product not found for reviews fetch');
  }
});

// @desc    Create new review
// @route   POST /api/products/:id/review
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed by this user');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ success: true, message: 'Review securely added' });
  } else {
    res.status(404);
    throw new Error('Product failed to map for new review');
  }
});

// @desc    Delete an individual review
// @route   DELETE /api/products/:id/review
// @access  Private
const deleteProductReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const reviewIndex = product.reviews.findIndex(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (reviewIndex !== -1) {
      product.reviews.splice(reviewIndex, 1);
      product.numReviews = product.reviews.length;
      product.rating = product.reviews.length > 0
        ? product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
        : 0;

      await product.save();
      res.json({ success: true, message: 'Review deleted successfully' });
    } else {
      res.status(404);
      throw new Error('Review not found or not owned by user');
    }
  } else {
    res.status(404);
    throw new Error('Product not found mapping to review deletion');
  }
});

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductReviews,
  createProductReview,
  deleteProductReview,
};
