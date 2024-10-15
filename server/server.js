const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
require('dotenv').config();
const auth = require('./middleware/auth');
const admin = require('firebase-admin');
const serviceAccount = require('./config/firebase-service-account.json');

const app = express();
const server = http.createServer(app);
const io = require('./socketio').init(server);
const setupSocketHandlers = require('./socketHandlers');

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
console.log('Connecting to MongoDB...');
mongoose.set('strictQuery', false);
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

// Register models
require('./models/Team');
require('./models/Player');
require('./models/Tournament');

// Setup socket handlers
setupSocketHandlers(io);

// Define routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// Team routes
const teamRoutes = require('./routes/teamRoutes');
app.use('/api/teams', auth, teamRoutes);

// Tournament routes
const tournamentRoutes = require('./routes/tournaments');
app.use('/api/tournaments', auth, tournamentRoutes);

// Player routes
const playerRoutes = require('./routes/players');
app.use('/api/players', auth, playerRoutes);

// Player Stats routes
const playerStatsRoutes = require('./routes/playerStats');
app.use('/api/player-stats', auth, playerStatsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, io };
