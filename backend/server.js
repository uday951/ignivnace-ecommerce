require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

// Connect to Database
connectDB();

const app = express();

// Security & Middleware
app.use(helmet());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 150, // Limit each IP to 150 requests per window
  message: { success: false, message: 'Too many requests from this IP' }
});
app.use('/api', apiLimiter);

const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://ignivnace-ecommerce.vercel.app',
  'http://localhost:5173',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy does not allow this origin.'));
    }
  },
  credentials: true,
}));
app.use(express.json()); // Parse JSON payloads
app.use(morgan('dev')); // API logging

// Sample API Status Route
app.get('/api', (req, res) => {
  res.status(200).json({ success: true, message: 'IGNIVANCE API is running...' });
});

// Mounted Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));

// Custom Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} on port ${PORT}`);
});
