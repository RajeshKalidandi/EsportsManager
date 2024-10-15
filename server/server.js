const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const playerRoutes = require('./routes/playerRoutes');
const teamRoutes = require('./routes/teamRoutes');
const tournamentRoutes = require('./routes/tournamentRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Update this to match your frontend URL
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["my-custom-header"],
  }
});

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Update this to match your frontend URL
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Define routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// Team routes
app.use('/api/players', playerRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/tournaments', tournamentRoutes);

const Player = require('./models/Player');

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('updatePlayerStats', async (data) => {
    try {
      const { playerId, stats } = data;
      const player = await Player.findByIdAndUpdate(playerId, 
        { $inc: { 
          'statistics.kills': stats.kills,
          'statistics.deaths': stats.deaths,
          'statistics.assists': stats.assists,
          'statistics.averageDamagePerRound': stats.averageDamagePerRound
        }},
        { new: true }
      );
      io.emit('playerStatsUpdated', player);
    } catch (error) {
      console.error('Error updating player stats:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
