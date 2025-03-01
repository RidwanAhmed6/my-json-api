require('dotenv').config(); // .env ফাইল লোড করুন

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// MongoDB URI .env ফাইল থেকে পড়ুন
const mongoURI = process.env.MONGO_URI;

// MongoDB কানেকশন
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// সার্ভার চালু করুন
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
