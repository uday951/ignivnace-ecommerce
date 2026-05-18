require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const connectDB = require('./config/db');

// Directly importing the array instead of using ES6 exports
const dummyProducts = [
  {
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    description: "Industry Leading Noise Canceling with Two processors control 8 microphones for unprecedented noise cancelation. With Auto NC Optimizer, noise canceling is automatically optimized based on your wearing conditions and environment.",
    price: 348.00,
    discount: 10,
    category: "Electronics",
    rating: 4.8,
    countInStock: 25,
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800"],
    numReviews: 2,
    reviews: [
      { name: "Alice", rating: 5, comment: "Amazing sound quality and ANC!", user: new mongoose.mongo.ObjectId() },
      { name: "Bob", rating: 4, comment: "Very comfortable but a bit pricey.", user: new mongoose.mongo.ObjectId() }
    ]
  },
  {
    title: "Apple iPhone 15 Pro, 256GB, Natural Titanium",
    description: "Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.",
    price: 1099.00,
    discount: 5,
    category: "Mobiles",
    rating: 4.9,
    countInStock: 50,
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800"],
    numReviews: 1,
    reviews: [
      { name: "Charlie", rating: 5, comment: "Best iPhone ever.", user: new mongoose.mongo.ObjectId() }
    ]
  },
  {
    title: "Men's Classic Wool Blend Trench Coat",
    description: "Stay warm and stylish this winter with our premium wool blend trench coat. Features a double-breasted front and belted waist.",
    price: 129.99,
    discount: 20,
    category: "Fashion",
    rating: 4.5,
    countInStock: 15,
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800"],
    numReviews: 1,
    reviews: [
      { name: "Dave", rating: 4, comment: "Fits perfectly and looks very premium.", user: new mongoose.mongo.ObjectId() }
    ]
  },
  {
    title: "Dyson V15 Detect Cordless Vacuum Cleaner",
    description: "The most powerful, intelligent cordless vacuum. Features laser illumination that reveals microscopic dust.",
    price: 749.99,
    discount: 15,
    category: "Appliances",
    rating: 4.7,
    countInStock: 8,
    images: ["https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&q=80&w=800"],
    numReviews: 1,
    reviews: [
      { name: "Eve", rating: 5, comment: "Makes cleaning so much easier.", user: new mongoose.mongo.ObjectId() }
    ]
  },
  {
    title: "Samsung 49-Inch Odyssey G9 Gaming Monitor",
    description: "Curved gaming monitor with 240Hz refresh rate and 1ms response time for ultra-smooth gameplay.",
    price: 1399.00,
    discount: 8,
    category: "Electronics",
    rating: 4.6,
    countInStock: 12,
    images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800"],
    numReviews: 1,
    reviews: [
      { name: "Frank", rating: 5, comment: "The curve is incredibly immersive.", user: new mongoose.mongo.ObjectId() }
    ]
  },
  {
    title: "Nespresso Vertuo Plus Coffee and Espresso Maker",
    description: "Brews 4 different cup sizes at the touch of a button. Includes an Aeroccino milk frother.",
    price: 199.00,
    discount: 25,
    category: "Appliances",
    rating: 4.8,
    countInStock: 30,
    images: ["https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=800"],
    numReviews: 1,
    reviews: [
      { name: "Grace", rating: 5, comment: "Makes café quality coffee at home.", user: new mongoose.mongo.ObjectId() }
    ]
  },
  {
    title: "Nike Air Force 1 '07 Sneakers",
    description: "The legend lives on in the Nike Air Force 1 '07, a modern take on the iconic AF1 that blends classic style and fresh details.",
    price: 110.00,
    discount: 0,
    category: "Fashion",
    rating: 4.9,
    countInStock: 100,
    images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614c3a?auto=format&fit=crop&q=80&w=800"],
    numReviews: 1,
    reviews: [
      { name: "Hank", rating: 5, comment: "Classic. You can't go wrong.", user: new mongoose.mongo.ObjectId() }
    ]
  },
  {
    title: "GoPro HERO12 Black Action Camera",
    description: "Incredible image quality, even better HyperSmooth video stabilization and a huge boost in battery life.",
    price: 399.00,
    discount: 10,
    category: "Electronics",
    rating: 4.7,
    countInStock: 45,
    images: ["https://images.unsplash.com/photo-1522067965939-505c21df2626?auto=format&fit=crop&q=80&w=800"],
    numReviews: 1,
    reviews: [
      { name: "Ivy", rating: 4, comment: "Great for extreme sports!", user: new mongoose.mongo.ObjectId() }
    ]
  }
];

const importData = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@ignivance.com',
        password: 'password123',
        isAdmin: true,
      },
      {
        name: 'Test Client',
        email: 'client@example.com',
        password: 'password123',
        isAdmin: false,
      }
    ]);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = dummyProducts.map((p) => {
      return { ...p, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('✅ Base Data successfully Seeded!');
    process.exit();
  } catch (error) {
    console.error(`❌ Data Seeding Failed: ${error.message}`);
    process.exit(1);
  }
};

importData();
