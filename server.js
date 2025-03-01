const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB কানেকশন
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// User স্কিমা
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  points: { type: Number, default: 0 },
});

// User মডেল
const User = mongoose.model('User', userSchema);

// API এন্ডপয়েন্ট: ইউজার ডাটা আপডেট
app.put('/api/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { username, points } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { userId }, // Query
      { $set: { username, points } }, // Update
      { new: true } // আপডেট করা ডকুমেন্ট রিটার্ন করুন
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// সার্ভার চালু করুন
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
