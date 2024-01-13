const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const bcrypt = require('bcrypt');
const cors = require('cors');
const path = require('path');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://root:123@abcproperty.xvtgnn3.mongodb.net/abcPropertyManagement');

// Admin Model
const adminSchema = new mongoose.Schema({ username: String, password: String });
const Admin = mongoose.model('Admin', adminSchema, 'admin');

// Listing Model
const listingSchema = new mongoose.Schema({
  thumbnail_image: String,
  properties_image: [String],
  city: String,
  street: String,
  type: { type: String, enum: ['apartment', 'house', 'office', 'land'] },
  mortgage: Number, // Assuming this is a number representing the price per month
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
  origin: ["https://abcproperty.vercel.app/", "https://abcproperty-admin.vercel.app/"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public/images'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });
const uploadFields = [
  { name: 'thumbnail_image', maxCount: 1 },
  { name: 'properties_image', maxCount: 10 }
];

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

app.post('/api/listings', upload.fields(uploadFields), async (req, res) => {
  const { city, street, type, mortgage, title, price, sellType, bedrooms, unitSize, garage, balcony, terrace, background, description } = req.body;
  const thumbnail_image = req.files['thumbnail_image'] ? req.files['thumbnail_image'][0].path.replace('public/', '') : null;
  const properties_image = req.files['properties_image'] ? req.files['properties_image'].map(file => file.path.replace('public/', '')) : [];

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

app.get('/api/listings', async (req, res) => {
  try {
    const listings = await Listing.find({});
    const updatedListings = listings.map(listing => {
      if (listing.thumbnail_image) {
        // Ensure the path is correct
        listing.thumbnail_image = '/images/' + path.basename(listing.thumbnail_image);
      }
      if (listing.properties_image) {
        // Do the same for property images
        listing.properties_image = listing.properties_image.map(image =>
          '/images/' + path.basename(image)
        );
      }
      return listing;
    });
    res.json(updatedListings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).send('Internal Server Error');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});