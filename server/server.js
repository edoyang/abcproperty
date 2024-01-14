const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://root:123@abcproperty.xvtgnn3.mongodb.net/abcPropertyManagement');

// Admin Model
const adminSchema = new mongoose.Schema({ username: String, password: String });
const Admin = mongoose.model('Admin', adminSchema, 'admin');

// Listing Model
const listingSchema = new mongoose.Schema({
  thumbnail_image: String, // This will store Base64 encoded image string
  properties_image: [String], // This will store an array of Base64 encoded image strings
  city: String,
  street: String,
  type: { type: String, enum: ['apartment', 'house', 'office', 'land'] },
  mortgage: Number,
  title: String,
  price: Number,
  sellType: String,
  bedrooms: Number,
  unitSize: Number,
  garage: Boolean,
  balcony: Boolean,
  terrace: Boolean,
  background: String,
  description: String
});
const Listing = mongoose.model('Listing', listingSchema, 'properties');

// Middleware
app.use(cors({
  origin: ["https://abcproperty.vercel.app", "https://abcproperty-admin.vercel.app"],
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Admin login endpoint
app.post('/api/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  try {
    const userQuery = usernameOrEmail.includes('@') ? { email: usernameOrEmail } : { username: usernameOrEmail };
    const adminUser = await Admin.findOne(userQuery);
    if (adminUser && await bcrypt.compare(password, adminUser.password)) {
      res.json({ status: 'success', message: 'Login successful' });
    } else {
      res.status(401).json({ status: 'error', message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Listing creation endpoint
app.post('/api/listings', async (req, res) => {
  const {
    thumbnail_image, // Base64 string
    properties_image, // Array of Base64 strings
    city,
    street,
    type,
    mortgage,
    title,
    price,
    sellType,
    bedrooms,
    unitSize,
    garage,
    balcony,
    terrace,
    background,
    description
  } = req.body;

  if (!thumbnail_image) {
    return res.status(400).json({ status: 'error', message: 'Thumbnail image is required.' });
  }

  try {
    const newListing = new Listing({
      thumbnail_image,
      properties_image,
      city,
      street,
      type,
      mortgage,
      title,
      price,
      sellType,
      bedrooms,
      unitSize,
      garage,
      balcony,
      terrace,
      background,
      description
    });
    const savedListing = await newListing.save();
    res.json({ status: 'success', message: 'Listing saved', listing: savedListing });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Listing retrieval endpoint
app.get('/api/listings', async (req, res) => {
  try {
    const listings = await Listing.find({});
    res.json(listings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Internal Server Error');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});