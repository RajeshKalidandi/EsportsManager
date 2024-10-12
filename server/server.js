const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
console.log('Connecting to MongoDB...');
mongoose.set('strictQuery', false); // Add this line to handle the deprecation warning
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  console.error('Error details:', err.message);
  process.exit(1);
});

// Define routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// Team routes
const teamRoutes = require('./routes/teamRoutes');
app.use('/api/teams', teamRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
