const mongoose = require('mongoose');

const StatisticsSchema = new mongoose.Schema({
  tournament: { type: mongoose.Schema.Types.ObjectId, ref: 'Tournament' },
  kills: { type: Number, default: 0 },
  deaths: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  // Add more game-specific statistics as needed
});

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String },
  jerseyNumber: { type: String },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  statistics: [StatisticsSchema]
}, { timestamps: true });

module.exports = mongoose.model('Player', PlayerSchema);
